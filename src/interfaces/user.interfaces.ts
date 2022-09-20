import { Contact } from "../entities/contact.entity";


export class ICreateUser{
    id:string;

    name: string;

    email:string;

    is_adm?:boolean

    phone:number;

    password:string;
}

export class IUserLogin {
    
    email:string;

    password:string;
}

export class IUserupdate {
   
    name?: string;

    email?:string;

    is_adm?:boolean

    phone?:string;

    password?:string;
}