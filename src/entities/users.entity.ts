import {Column, CreateDateColumn, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn} from "typeorm"
import { Contact } from "./contact.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    name: string;

    @Column({unique:true})
    email:string;

    @Column({default:false, type:"boolean"})
    is_adm:boolean

    @Column()
    phone:number;
    
    @Column()
    password:string;

    @CreateDateColumn()
    created_at:Date;

    @OneToMany(type => Contact, contact => contact.owner, {eager:true})
    @JoinTable()
    contacts:Contact[]
}