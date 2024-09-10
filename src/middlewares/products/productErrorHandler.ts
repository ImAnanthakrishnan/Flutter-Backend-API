import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (!err) {
    next();
  } else {
    res.status(statusCode).json({
      message: message || "Internal Server Error",
    });
    return;
  }
};

export { errorHandler };
