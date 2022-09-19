import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Contact } from "./contact.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name: string;

    @Column()
    email:string;

    @Column()
    telefone:number;
    
    @Column()
    password:string;

    @OneToMany(type => Contact, contact => contact.owner)
    contacts?:Contact[]
}