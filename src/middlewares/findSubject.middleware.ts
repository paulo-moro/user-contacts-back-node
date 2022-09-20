import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../datasource"
import { Contact } from "../entities/contact.entity"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/appErrors"

const findSubject = async (req:Request, res:Response, next:NextFunction) =>{
    if(!req.user){
        throw new AppError(404, "Logged User not found")
    }
    
    if(req.params.userId){
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({id:req.params.userId})
        if(!user){
            throw new AppError(404, "Subject User not found")
        }

    }

    if(req.params.contactId){
        const contactRepository = AppDataSource.getRepository(Contact)
        const contact = await contactRepository.findOneBy({id:req.params.contactId})
        if(!contact){
            throw new AppError(404, "Subject Contact not found")
        }

    }

    next()
}


export default findSubject