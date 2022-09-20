import { AppDataSource } from "../../datasource";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors";
import { IUserLogin } from "../../interfaces/user.interfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginUserService =async (userData:IUserLogin) => {
    const userRepository = AppDataSource.getRepository(User)

    const account = await userRepository.findOne({where:{email:userData.email}})

    if(!account || !bcrypt.compareSync(userData.password, account.password)){
        throw new AppError(404, "Wrong email/password")
    }

    const token = jwt.sign({id:account.id}, String(process.env.SECRET_KEY), {expiresIn: "1d"})

    return token
    
}

export default loginUserService