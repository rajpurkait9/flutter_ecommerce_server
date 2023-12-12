import { Response } from "express";

export function errorHandler(error: any, res: Response) {
  const message = error.message || "Internal server error";
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({ message });
}
