import { AppDataSource } from "../../datasource"
import { IContactUpdate } from "../../interfaces/contact.interfaces";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appErrors";


const updateContactService = async (contactId:string, changes:IContactUpdate) => {
    const contactRepository = AppDataSource.getRepository(Contact)

    const contact = await contactRepository.findOneBy({id:contactId})

    if(!contact){
        throw new AppError(404, "Contact not found")
    }

    
    await contactRepository.update(contact, changes)
    const updatedContact = {...contact, ...changes}

    const returningContact = {
        id: updatedContact.id,
        email: updatedContact.email,
        name: updatedContact.name,
        phone: updatedContact.phone,
        owner: updatedContact.owner.id
    }

    return returningContact  
    
}

export default updateContactService