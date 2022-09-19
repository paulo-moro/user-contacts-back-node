import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./users.entity";


@Entity()
export class Contact {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name:string;

    @Column()
    email:string;

    @ManyToOne(type=>User, user=> user.contacts, { eager:true})
    owner:User

    @Column()
    telefone:number;
}