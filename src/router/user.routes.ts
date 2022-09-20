import { Router } from "express";
import { createUserController, deleteUserController, loginUserController, profileUserController, updateUserController } from "../controller/users.controller";
import authToken from "../middlewares/authToken.middleware";
import findUser from "../middlewares/findUser.middleware";
import isOwnerOrAdmin from "../middlewares/isOwnerOrAdmin.middleware";


const routes = Router()

export const userRoutes = () => {

    routes.post("", createUserController);
    routes.post("/login", loginUserController);
    routes.get("/:id", authToken, isOwnerOrAdmin, findUser, profileUserController);
    routes.patch("/:id", authToken, isOwnerOrAdmin, findUser, updateUserController);
    routes.delete("/:id", authToken, isOwnerOrAdmin, findUser, deleteUserController)

}