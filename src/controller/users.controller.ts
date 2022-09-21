import {Response, Request} from "express"
import { AppError } from "../errors/appErrors"
import createUserService from "../services/user/createUser.service"
import deleteUserServices from "../services/user/deleteUser.service"
import userProfileService from "../services/user/listUserProfile.service"
import loginUserService from "../services/user/loginUser.service"
import updateUserServices from "../services/user/updateUser.service"

export const createUserController = async (req:Request, res:Response) => {

    const newUser = await createUserService(req.body)
    return res.status(201).json(newUser)
        
}

export const loginUserController = async (req:Request, res:Response) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new AppError(409, "Email and password is required for login")
    }

    const token = await loginUserService(req.body)
    
    return  res.status(200).json({token}) 
}

export const profileUserController = async (req:Request, res:Response) => {
    const {userId} = req.params

    const user = await userProfileService(userId)
    
    return res.status(200).json(user)
      
}

export const updateUserController = async (req:Request, res:Response) => {
    const {userId} = req.params

    const user = await updateUserServices(userId, req.body)

    return res.status(200).json(user)
        
   
}

export const deleteUserController =async (req:Request, res:Response) => {
    const {userId} = req.params
    
    await deleteUserServices(userId)

    return res.status(204).send()
 
}