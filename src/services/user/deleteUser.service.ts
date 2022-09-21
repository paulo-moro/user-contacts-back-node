import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"



const deleteUserServices =async (userId:string):Promise<void> => {
    const userRepository = AppDataSource.getRepository(User)

    await userRepository.delete(userId)
}

export default deleteUserServices