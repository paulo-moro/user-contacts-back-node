import { AppDataSource } from "../../datasource"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/users.entity";

const listUserContactsService = async (user:User) =>{
    const contactRepository = AppDataSource.getRepository(Contact)
    
    const userContacts = await contactRepository.find({where:{owner:user}})

    return userContacts
}

export default listUserContactsService