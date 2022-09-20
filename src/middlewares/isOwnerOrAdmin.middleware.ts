import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../datasource"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/appErrors"


const isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.headers.authorization
    const {id} = req.params

    const splitToken = token!.split(" ")
  
    jwt.verify(splitToken[1], process.env.SECRET_KEY as string, async (error: any, decoded: any ) => {
      if(error){
        throw new AppError(401, "Invalid token")
      }
      const userRepository = AppDataSource.getRepository(User)
      const user = await userRepository.findOneBy({id:id})

      if(!id === decoded.id || !user?.is_adm){
        throw new AppError(403, "You do not have permission for this action")
      }
      
      next()
  
    })

}

export default isOwnerOrAdmin