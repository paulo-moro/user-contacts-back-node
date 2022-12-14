import { AppDataSource } from "../../data-source"
import { IContactUpdate } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appErrors";


const updateContactService = async (contactId:string, changes:IContactUpdate) => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOneBy({id:contactId})
    
    if(!contact){
        throw new AppError(404, "Contact not found")
    }
    
    
    await contactRepository.update({id: contact.id}, changes)
    const updatedContact = {...contact, ...changes}
    
    const returningContact = {
        id: updatedContact.id,
        email: updatedContact.email,
        name: updatedContact.name,
        phone: updatedContact.phone,
    }
    
    return returningContact  
    
}

export default updateContactService