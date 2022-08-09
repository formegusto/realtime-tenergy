import Express from "express";
import jwt from "jsonwebtoken";
import _ from "lodash";

import { StatusCodes } from "http-status-codes";

import { ResponseError } from "@common";
import { ControlConfigModel } from "@models";

export function adminCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const { ADMIN_REQUEST_KEY: ADMIN_KEY } = process.env;
  const { authorization: _ADMIN_KEY } = req.headers;

  if (ADMIN_KEY !== _ADMIN_KEY)
    throw new ResponseError(
      StatusCodes.UNAUTHORIZED,
      "올바르지 않은 권한 입니다."
    );

  return next();
}

export function loginCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const secret = process.env.JWT_SECRET!;
  const { authorization: token } = req.headers;

  if (!token)
    return next(
      new ResponseError(StatusCodes.FORBIDDEN, "올바르지 않은 접근 입니다.")
    );

  try {
    const { control } = jwt.verify(token, secret) as any;
    req.control = control;
  } catch (err) {
    return next(
      new ResponseError(StatusCodes.UNAUTHORIZED, "올바르지 않은 권한 입니다.")
    );
  }

  return next();
}

// 현재 Database의 내용과 같은지 확인하는 함수
export async function controlCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const { _id } = req.control;
  console.log(req.control);

  const controlConfig = await ControlConfigModel.findById(_id);
  console.log(controlConfig);
  if (!controlConfig)
    return next(
      new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 토큰입니다.")
    );

  if (
    new Date(req.control.updatedAt).getTime() !==
    controlConfig.toObject().updatedAt!.getTime()
  )
    return next(
      new ResponseError(StatusCodes.BAD_REQUEST, "잘못된 토큰입니다.")
    );

  return next();
}
