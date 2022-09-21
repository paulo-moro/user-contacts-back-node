import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/users.entity";
import { ICreateContact } from "../../interfaces/contact.interfaces";
import { AppError } from "../../errors/appErrors";


const createContactService = async (user:User , contact:ICreateContact) =>{
    const contactRepository = AppDataSource.getRepository(Contact)

    const isAlreadyContact = user.contacts.find(person=>person.email === contact.email)

    if(isAlreadyContact){
        throw new AppError(400, "User already have this contact")
    }

    const newContact = new Contact()

    newContact.email = contact.email
    newContact.name = contact.name
    newContact.phone = contact.phone
    newContact.owner = user

    await contactRepository.save(newContact)
    
    const returningContact = {
        id: newContact.id,
        email: newContact.email,
        name: newContact.name,
        phone: newContact.phone,
        owner: newContact.owner.id
    }

    return returningContact
}

export default createContactService