import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities/contact.entity"
import { AppError } from "../errors/appErrors"


const isContactOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    const {contactId} = req.params

    const contactRepository = AppDataSource.getRepository(Contact)
    const contacts = await contactRepository.find({relations:{owner:true}})
    
    const contact = contacts.find(contact=>contact.id === contactId)
    
    if(!contact){
        throw new AppError(404, "Contact not found")
    }  
    
    if(contact.owner.id !== req.user.id && !req.user.is_adm){
        throw new AppError(403, "You do not have permission for this action")
    }
   
    next()

}

export default isContactOwnerOrAdmin
