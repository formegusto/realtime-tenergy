import { StatusCodes, getReasonPhrase } from "http-status-codes";

export class ResponseError extends Error {
  statusCode: StatusCodes;

  constructor(statusCode: StatusCodes, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = getReasonPhrase(this.statusCode);
  }
}
