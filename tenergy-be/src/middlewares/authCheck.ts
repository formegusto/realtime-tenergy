import Express from "express";
import ResponseError from "../common/ResponseError";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export function adminCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const { ADMIN_REQUEST_KEY: ADMIN_KEY } = process.env;
  const { authorization: _ADMIN_KEY } = req.headers;

  if (ADMIN_KEY !== _ADMIN_KEY) {
    throw new ResponseError(
      StatusCodes.UNAUTHORIZED,
      "올바르지 않은 권한 입니다."
    );
  }

  return next();
}

export function loginCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  return next();
}
