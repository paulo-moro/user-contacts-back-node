import { AppDataSource } from "../../data-source";
import { User } from "../../entities/users.entity";
import { AppError } from "../../errors/appErrors";
import { ICreateUser } from "../../interfaces/user.interfaces";
import bcrypt from "bcryptjs";



const createUserService = async (newUser:ICreateUser) => {
    const userRepository = AppDataSource.getRepository(User);

    const users = await userRepository.find();
    
    if(!newUser.name || !newUser.email || !newUser.phone || !newUser.password){
        throw new AppError(412, "User need a name, email, password and phone to be created.")
    }
 
    const emailAlreadyExists = users.find((user)=> user.email === newUser.email);

    if(emailAlreadyExists){
        throw new AppError(400, "User with this email already exist");
    }

    const user = new User();
    
    user.name = newUser.name
    user.email = newUser.email
    user.password = bcrypt.hashSync(newUser.password, 10)
    user.phone = newUser.phone
    if(newUser.is_adm){
        user.is_adm= newUser.is_adm
    }

    userRepository.create(user)
    await userRepository.save(user)

    const {password, ...returningUser} = user

    return returningUser
     

} 

export default createUserService