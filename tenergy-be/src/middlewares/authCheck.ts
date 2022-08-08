import Express from "express";
import ResponseError from "../common/ResponseError";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export function adminCheck(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const { ADMIN_REQUEST_KEY: ADMIN_KEY } = process.env;
  const { authorization: _ADMIN_KEY } = req.headers;

  console.log(ADMIN_KEY === _ADMIN_KEY);
  console.log(ADMIN_KEY !== _ADMIN_KEY);
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
  const secret = process.env.JWT_SECRET!;
  const { authorization: token } = req.headers;

  if (!token)
    throw new ResponseError(
      StatusCodes.FORBIDDEN,
      "올바르지 않은 접근 입니다."
    );

  try {
    const { control } = jwt.verify(token, secret) as any;
    req.control = control;
  } catch (err) {
    throw new ResponseError(
      StatusCodes.UNAUTHORIZED,
      "올바르지 않은 권한 입니다."
    );
  }

  return next();
}
