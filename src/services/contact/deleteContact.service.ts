import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"


const deleteContactService = async (contactId:string):Promise<void> =>{
    const contactRepository = AppDataSource.getRepository(Contact)
    
    await contactRepository.delete(contactId)
    
}

export default deleteContactService