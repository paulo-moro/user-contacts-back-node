import { Router } from "express";
import { createContactController, deleteContactController, listUserContactController, updateContactController } from "../controller/contact.controller";
import authToken from "../middlewares/authToken.middleware";
import findSubject from "../middlewares/findSubject.middleware";
import isContactOwnerOrAdmin from "../middlewares/isContactOwnerOrAdmin.middleware";


const routes = Router()


export const contactRoutes = () => {
    routes.post("", authToken, findSubject,  createContactController)
    routes.get("",authToken, findSubject,  listUserContactController )
    routes.patch("/:contactId",authToken, findSubject, isContactOwnerOrAdmin, updateContactController)
    routes.delete("/:contactId",authToken, findSubject, isContactOwnerOrAdmin, deleteContactController)

    return routes
}

