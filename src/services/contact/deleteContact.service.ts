import { AppDataSource } from "../../datasource"
import { Contact } from "../../entities/contact.entity"


const deleteContactService = async (contactId:string) =>{
    const contactRepository = AppDataSource.getRepository(Contact)

    await contactRepository.delete(contactId)
}

export default deleteContactService