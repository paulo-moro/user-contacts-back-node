import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appErrors"
import jwt from "jsonwebtoken"
import "dotenv/config"


const authToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
  
    if(!token){
      throw new AppError(401, "Missing authorization token")
    }
  
    const splitToken = token.split(" ")
  
    jwt.verify(splitToken[1], process.env.SECRET_KEY as string, (error: any, decoded: any ) => {
      if(error){
        throw new AppError(401, "Invalid token")
      }
  
      next()
  
    })
  
  }
  export default authToken