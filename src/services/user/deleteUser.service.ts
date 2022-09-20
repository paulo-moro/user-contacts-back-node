import { AppDataSource } from "../../datasource"
import { User } from "../../entities/users.entity"



const deleteUserServices =async (userId:string) => {
    const userRepository = AppDataSource.getRepository(User)

    await userRepository.delete(userId)
}

export default deleteUserServices