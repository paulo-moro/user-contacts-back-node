import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appErrors"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { AppDataSource } from "../datasource"
import { User } from "../entities/users.entity"


const authToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
  
    if(!token){
      throw new AppError(401, "Missing authorization token")
    }
  
    const splitToken = token.split(" ")
  
    jwt.verify(splitToken[1], process.env.SECRET_KEY as string, async (error: any, decoded: any ) => {
      if(error){
        throw new AppError(401, "Invalid token")
      }
      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOneBy({id:decoded.id})

      req.user= user
      next()
  
    })
  
  }
  export default authToken