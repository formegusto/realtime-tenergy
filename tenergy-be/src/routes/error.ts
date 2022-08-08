import Express from "express";
import ResponseError from "../common/ResponseError";

export default function errorHandler(
  err: ResponseError,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  return res.status(err.statusCode).json({
    name: err.name,
    message: err.message,
  });
}
