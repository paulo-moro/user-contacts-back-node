import {Response, Request} from "express"
import createContactService from "../services/contact/createContact.service"
import deleteContactService from "../services/contact/deleteContact.service"
import listUserContactsService from "../services/contact/listUserContacts.service"
import updateContactService from "../services/contact/updateContact.service"


export const createContactController = async (req:Request, res:Response) => {

    const newContact = await createContactService(req.user, req.body)

    return res.status(201).json(newContact)

}

export const listUserContactController = async (req:Request, res:Response) => {
    
    const contactList = await listUserContactsService(req.user)
    
    return res.status(200).json(contactList)
}

export const updateContactController = async (req:Request, res:Response) => {
    const {contactId} = req.params
    
    const updatedContact = await updateContactService(contactId, req.body)

    return res.status(200).json(updatedContact)
}

export const deleteContactController = async (req:Request, res:Response) => {
    const {contactId} = req.params

    await deleteContactService(contactId)

    return res.status(204)
}