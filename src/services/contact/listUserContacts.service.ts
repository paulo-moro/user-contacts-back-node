import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities/contact.entity"
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors";

const listUserContactsService = async (user:User) =>{

    return user.contacts
}

export default listUserContactsService