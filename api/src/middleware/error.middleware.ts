import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

import { ApiError, NotFoundError } from "@/utils/errors";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.flatten(),
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: `Cannot ${req.method} ${req.originalUrl}`,
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
  });
};
