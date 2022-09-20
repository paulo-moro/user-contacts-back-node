import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../datasource"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/appErrors"

const findUser = async (req:Request, res:Response, next:NextFunction) =>{
    const {id} = req.params

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id:id})

    if(!user){
        throw new AppError(404, "User not found")
    }

    next()
}


export default findUser