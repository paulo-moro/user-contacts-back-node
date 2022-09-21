import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"
import { AppError } from "../../errors/appErrors"



const userProfileService =async (userId:string) => {
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({id:userId})

    if(!user){
        throw new AppError(404, "User not found")
    }
    const {password, ...returnUser} = user

    return returnUser
}

export default userProfileService