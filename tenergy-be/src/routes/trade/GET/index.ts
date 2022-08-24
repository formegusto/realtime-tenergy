import { AdvancedTrade, ControlConfig, MonthMeterData } from "@models/types";
import { TradeMixedDataBuilder, TradeModel } from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import _ from "lodash";
import { StatusCodes } from "http-status-codes";
import { ResponseError } from "@common";
import { demandFunction } from "@utils";
import { Sample } from "../types";

const routes = Express.Router();

routes.get(
  "/request",
  loginCheck,
  async (req: Express.Request, res: Express.Response) => {
    const { name: responser } = req.household;

    const _tradeRequests = await TradeModel.find(
      { responser, status: "request" },
      {},
      { sort: { createdAt: 1 } }
    );
    const tradeRequests = await Promise.all(
      _.map(_tradeRequests, (trade) => AdvancedTrade.get(trade))
    );

    return res.status(StatusCodes.OK).json(tradeRequests);
  }
);

routes.get(
  "/sample",
  loginCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { requester: reqName, responser: resName, quantity } = req.query;
    const controlConfig = await ControlConfig.getRecently();
    const builder = new TradeMixedDataBuilder(parseInt(quantity as string));
    const td = builder.get();
    await builder.step1(reqName as string, resName as string);

    console.log("requester", td.requester);
    console.log("responser", td.responser);

    // 둘 중 구매자가 누구인지 판멸
    const buyer = td.buyer;
    const seller = td.seller;

    const sellerBenefit = Math.round(
      demandFunction(
        buyer.kwh,
        parseInt(quantity as string),
        controlConfig.month
      )
    );
    console.log(sellerBenefit);

    buyer.tradeQuantity = parseInt(quantity as string);
    seller.tradeQuantity = parseInt(quantity as string);

    const tradeBuyer = buyer.tradeObj;
    const tradeSeller = seller.tradeObj;

    tradeBuyer.tradePrice = sellerBenefit;
    tradeSeller.tradePrice = sellerBenefit * -1;

    console.log("구매자 정보");
    const buyerUsage = _.zipObject(
      ["beforeUsage", "afterUsage", "err"],
      [buyer.kwh, tradeBuyer.kwh, tradeBuyer.kwh - buyer.kwh]
    );
    const buyerPrice = _.zipObject(
      ["beforePrice", "afterPrice", "err"],
      [buyer.bill, tradeBuyer.bill, tradeBuyer.bill - buyer.bill]
    );
    const sellerUsage = _.zipObject(
      ["beforeUsage", "afterUsage", "err"],
      [seller.kwh, tradeSeller.kwh, tradeSeller.kwh - seller.kwh]
    );
    const sellerPrice = _.zipObject(
      ["beforePrice", "afterPrice", "err"],
      [seller.bill, tradeSeller.bill, tradeSeller.bill - seller.bill]
    );

    // console.log("판매자 정보");
    // console.log(seller.basic, seller.elecRate, seller.bill);
    // console.log(tradeSeller.basic, tradeSeller.elecRate, tradeSeller.bill);

    const buyerJson: Sample = {
      role: "buyer",
      name: buyer.name,
      usage: buyerUsage as any,
      price: buyerPrice as any,
    };
    const sellerJson: Sample = {
      role: "seller",
      name: seller.name,
      usage: sellerUsage as any,
      price: sellerPrice as any,
    };

    return res.status(StatusCodes.OK).json({
      seller: sellerJson,
      buyer: buyerJson,
    });
  }
);

export default routes;
