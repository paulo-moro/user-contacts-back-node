import { AppDataSource } from "../../datasource"
import { User } from "../../entities/users.entity"
import { AppError } from "../../errors/appErrors"
import { IUserupdate } from "../../interfaces/user.interfaces"
import bcrypt from "bcryptjs";


const updateUserServices = async (userId:string, changes:IUserupdate) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id:userId})

    if(!user){
        throw new AppError(404, "User not found")
    }

    if(changes.password){
        changes.password = bcrypt.hashSync(changes.password, 10)
    }

    await userRepository.update(user, changes)

    const updatedUser = {...user, ...changes}

    const {password, ...returingUser} = updatedUser

    return returingUser
   
    
}

export default updateUserServices