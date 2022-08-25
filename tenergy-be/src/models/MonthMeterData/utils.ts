import { demandFunction } from "@utils";
import _ from "lodash";
import { MonthMeterDataModel } from ".";
import { MonthMeterHistoryModel } from "../MonthMeterHistory";
import { TradeModel } from "../Trade";
import { AdvancedTrade, MonthMeterData } from "../types";

export async function historySlicingUpdate(
  tradeLabelId: string,
  trader: MonthMeterData,
  inc: number,
  isDelete?: boolean
) {
  const _inc = trader.role === "buyer" ? inc : inc * -1;
  const history = await MonthMeterHistoryModel.findOne(
    { name: trader.name },
    { kwh: 1 }
  );

  const targetKwhIdx = _.findIndex(
    history?.kwh,
    ({ tradingLabel }) =>
      tradingLabel !== undefined && tradingLabel.id === tradeLabelId
  );
  const prevHistory = _.take(history!.kwh, targetKwhIdx);
  const nextHistory = _.takeRight(
    history!.kwh,
    history!.kwh.length - targetKwhIdx
  );

  console.log("original history", history?.kwh);
  console.log("prev history", prevHistory);
  console.log("next history", nextHistory);

  let newNextHistory = _.map(nextHistory, (history) => ({
    ...history,
    value: history.value + _inc,
  }));

  if (isDelete) newNextHistory = _.drop(newNextHistory);

  const newHistory = _.concat(prevHistory, newNextHistory);
  console.log("new history", newHistory);

  await MonthMeterHistoryModel.updateOne(
    {
      name: trader.name,
    },
    {
      $set: { kwh: newHistory },
    }
  );
}

export async function cancleTradeById(_id: string) {
  const trade = await TradeModel.findById(_id);

  if (!trade) throw new Error("Not Found Trade.");

  const adTrade = await AdvancedTrade.get(trade);
  const { id, responser, requester, quantity } = adTrade;

  await historySlicingUpdate(id, responser, quantity, true);
  await historySlicingUpdate(id, requester, quantity, true);
}

export async function cancleTrade(name: string, err: number, month: number) {
  let _err = err;

  while (_err > 0) {
    console.log("------------cancle trade------------");
    console.log("target", name, "pop usage", err);

    const trades = await TradeModel.find({
      $or: [{ requester: name }, { responser: name }, { status: "establish" }],
    });
    if (trades.length === 0) break;
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
    const minIdx = _.indexOf(demands, _.min(demands)!);
    const targetTrade = trades[minIdx];
    const { id, requester, responser, quantity } = await AdvancedTrade.get(
      targetTrade
    );

    const availableCancleQuantity = quantity - _err >= 0 ? _err : quantity;
    const isDelete = Math.round(availableCancleQuantity - quantity) === 0;
    console.log("available", availableCancleQuantity);

    await historySlicingUpdate(
      id,
      requester,
      availableCancleQuantity,
      isDelete
    );
    await historySlicingUpdate(
      id,
      responser,
      availableCancleQuantity,
      isDelete
    );

    // update trade
    await TradeModel.updateOne(
      { id: targetTrade._id },
      {
        $inc: { quantity: availableCancleQuantity * -1 },
        ...(isDelete ? { $set: { status: "cancle" } } : {}),
      }
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
