import { Distributor } from "@models/types";
import { ResponseError } from "@common";
import {
  APTModel,
  ControlConfigModel,
  DistributorModel,
  MixedDataBuilder,
  MonthMeterDataModel,
} from "@models";
import { loginCheck } from "@mw";
import Express from "express";
import { StatusCodes } from "http-status-codes";
import _ from "lodash";

const routes = Express.Router();

// root
routes.get(
  "/",
  loginCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const _control = await ControlConfigModel.find(
      {},
      { _id: 1, month: 1 },
      { sort: { updatedAt: -1 } }
    );
    if (_control.length === 0)
      return next(
        new ResponseError(
          StatusCodes.NOT_FOUND,
          "관리자 측에서 설정한 제어정보가 없습니다."
        )
      );
    const control = _control[0].toObject();
    const apt = await APTModel.findOne(
      { controlId: control._id },
      { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, controlId: 0 }
    );

    // bill calc
    // distributor
    const distributorDocs = await DistributorModel.findOne({
      controlId: control._id,
    });
    const distributor = Distributor.getFromDocs(distributorDocs!);
    await distributor.setHouseholds();
    await distributor.setMixedData(apt!.apt, control.month);

    const tradePrice = await distributor.mixedData!.tradePrice();
    console.log(tradePrice);

    const publicPrice = await distributor.mixedData!.publicPrice();
    console.log("Public Price", publicPrice);

    // get contributions
    const contributions = distributor.contributions;
    console.log("contributions", distributor.contributions);

    // histInfo
    console.log(
      "hist information",
      distributor.histInfo,
      _.sum(distributor.histInfo)
    );

    // get groupPrices
    // contribution price
    console.log(distributor.binValues);

    const groupPrice = distributor.groupPrice;
    console.log(groupPrice);

    // groupPrices Error
    const errGroupPrice = distributor.errGroupPrice;
    console.log(distributor.errGroupPrice);

    const table = distributor.table;

    return res.status(StatusCodes.OK).json({
      publicPrice,
      distributionTable: table,
    });
  }
);

// :my id
routes.get(
  "/:id",
  loginCheck,
  async (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { name } = req.household;

    const _control = await ControlConfigModel.find(
      {},
      { _id: 1, month: 1 },
      { sort: { updatedAt: -1 } }
    );
    if (_control.length === 0)
      return next(
        new ResponseError(
          StatusCodes.NOT_FOUND,
          "관리자 측에서 설정한 제어정보가 없습니다."
        )
      );
    const control = _control[0].toObject();

    const builder = new MixedDataBuilder();
    const mixedData = builder.get();

    await builder.step1(control.month);
    await builder.step2_ex(control._id, control.month);

    const APTUsage = mixedData.apt!.kwh * mixedData.households!.length;
    const nowPublicPrice = await mixedData.publicPrice();
    builder.prev = -1;
    await builder.step1(control.month);
    await builder.step2_ex(control._id, control.month);
    const prevPublicPrice = await mixedData.publicPrice();

    // Setting
    await builder.step3(name);
    await builder.step4(control._id as any);
    const distributor = mixedData.distributor!;
    await distributor.setHouseholds();
    await distributor.setMixedData(APTUsage, control.month);

    // get Group

    return res.status(StatusCodes.OK).json({
      publicPrice: nowPublicPrice,
      err: nowPublicPrice - prevPublicPrice,
      privatePublicPrice: Math.round(mixedData.distributor!.priPrice),
      distribution: mixedData.householdDistribution,
      histInfo: distributor.histInfo,
      distributionTable: distributor.table,
    });
  }
);

export default routes;
