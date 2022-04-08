import { ErrorRequestHandler } from "express";

export class RequestError extends Error {
  error: number;
  constructor(message: string, error: number) {
    super();
    this.message = message;
    this.error = error;
    Error.captureStackTrace(this);
  }
}
// eslint-disable-next-line no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.error).json({
    error: err.error,
    message: err.message,
  });
};
