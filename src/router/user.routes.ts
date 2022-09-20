import { Router } from "express";
import { createUserController, deleteUserController, loginUserController, profileUserController, updateUserController } from "../controller/users.controller";
import authToken from "../middlewares/authToken.middleware";
import findSubject from "../middlewares/findSubject.middleware";
import isAccountOwnerOrAdmin from "../middlewares/isAccountOwnerOrAdmin.middleware";


const routes = Router()

export const userRoutes = () => {

    routes.post("", createUserController);
    routes.post("/login", loginUserController);
    routes.get("/:userId", authToken, findSubject, isAccountOwnerOrAdmin,  profileUserController);
    routes.patch("/:userId", authToken, findSubject, isAccountOwnerOrAdmin, updateUserController);
    routes.delete("/:userId", authToken, findSubject, isAccountOwnerOrAdmin, deleteUserController)

    return routes
}