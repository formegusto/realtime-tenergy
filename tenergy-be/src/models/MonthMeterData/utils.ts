import { demandFunction } from "@utils";
import _ from "lodash";
import { MonthMeterDataModel } from ".";
import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { TradeModel } from "../Trade";

export async function cancleTrade(name: string, err: number, month: number) {
  let _err = err;

  while (_err > 0) {
    console.log("------------cancle trade------------");
    console.log("target", name, "pop usage", err);

    const trades = await TradeModel.find({
      $or: [{ requester: name }, { responser: name }],
    });
    const demands: Array<number> = await Promise.all(
      _.map(trades, async ({ requester, responser, updatedAt, quantity }) => {
        const buyerName = requester === name ? responser : requester;
        const buyer = await MonthMeterDataModel.findOne({
          name: buyerName,
        });
        let buyerUsage = buyer!.kwh;

        // 나보다 앞 순의 거래들
        const otherTradeList = await TradeModel.find({
          updatedAt: { $lt: updatedAt },
          status: "establish",
        });
        const otherTradeSum = _.sumBy(
          otherTradeList,
          ({ quantity }) => quantity
        );
        console.log("other trade sum", otherTradeSum);
        // 거래를 모두 진행한 내 차례때의 사용량
        buyerUsage -= otherTradeSum;
        console.log("real buyer usage", buyerUsage);
        const demand = demandFunction(buyerUsage, quantity, month);

        return demand;
      })
    );
    const maxIdx = _.indexOf(demands, _.max(demands)!);
    const targetTrade = trades[0];

    let meterHistory = await MonthMeterHistoryModel.findOne(
      {
        name,
      },
      {
        _id: 0,
        kwh: 1,
      }
    );
    meterHistory = meterHistory!.toObject();

    console.log("target", targetTrade);
    console.log("kwh", meterHistory.kwh);

    const targetKwhIdx = _.findIndex(
      meterHistory.kwh,
      ({ tradingLabel }) =>
        tradingLabel !== undefined &&
        tradingLabel.id === String(targetTrade._id)
    );
    console.log(targetKwhIdx);
    const slicePrev = _.take(meterHistory.kwh, targetKwhIdx);
    const sliceNext = _.takeRight(
      meterHistory.kwh,
      meterHistory.kwh.length - targetKwhIdx
    );
    console.log("prev", slicePrev);
    console.log("next", sliceNext);

    // available cancle quantity
    const quantity = targetTrade.quantity;
    const availableCancleQuantity = quantity - _err >= 0 ? _err : quantity;
    console.log("available", availableCancleQuantity);

    const updateSliceNext = _.map(sliceNext, (history) => ({
      ...history,
      value: history.value - availableCancleQuantity,
    }));
    console.log("update next", updateSliceNext);

    const updateQuantity = quantity - availableCancleQuantity;
    console.log("update quantity", updateQuantity);

    // update trade
    await TradeModel.updateOne(
      { id: targetTrade._id },
      { $inc: { quantity: availableCancleQuantity * -1 } }
    );

    // update history
    const updateHistory = _.concat(slicePrev, updateSliceNext);
    await MonthMeterHistoryModel.updateOne(
      {
        name,
      },
      { $set: { kwh: updateHistory } }
    );

    _err -= availableCancleQuantity;
  }

  const trades = await TradeModel.find({
    $or: [
      {
        requester: name,
      },
      {
        responser: name,
      },
    ],
    status: "establish",
  });

  // new total quantity
  return _.sumBy(trades, ({ quantity }) => quantity);
}
