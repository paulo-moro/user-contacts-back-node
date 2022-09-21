import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contact.entity"
import { User } from "../entities/users.entity"
import { AppError } from "../errors/appErrors"

const findSubject = async (req:Request, res:Response, next:NextFunction) =>{
    const userRepository = AppDataSource.getRepository(User)
    const loggedUser = await userRepository.findOneBy({id:req.userId})
    
    if(!loggedUser){
        throw new AppError(404, "Logged User not found")
    }
    req.user = loggedUser
    
    if(req.params.userId){
        const subjectUser = await userRepository.findOneBy({id:req.params.userId})
        if(!subjectUser){
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