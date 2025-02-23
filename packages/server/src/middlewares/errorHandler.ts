import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ status: '401', message: 'Unauthorized' });
  } else if (err.name === 'ValidationError') {
    res.status(400).json({ status: '400', message: err.message });
  } else {
    res.status(500).json({ status: '500', message: 'Internal Server Error' });
  }
};
