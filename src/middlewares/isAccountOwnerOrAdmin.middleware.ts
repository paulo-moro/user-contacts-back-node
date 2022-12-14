import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors/appErrors"


const isAccountOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) =>{
    const {userId} = req.params
    
    if(!(req.user.id === userId) && req.user.is_adm === false){
      throw new AppError(403, "You do not have permission for this action")
    }
    
    next()
}

export default isAccountOwnerOrAdmin