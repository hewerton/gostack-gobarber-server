import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

interface IErrorResponse {
  status: string;
  message: string;
}

const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  _next: NextFunction,
): any => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
};

export default errorHandler;
