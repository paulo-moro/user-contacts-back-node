import { Request, Response, NextFunction } from 'express' 
import { AppError } from '../errors/appErrors'



export const handleError = (err: Error, req: Request, res: Response, _:NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    statusCode: 500,
    message: "Internal server error!"
  })
}