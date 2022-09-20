import { DataSource } from "typeorm";


export const AppDataSource = 
process.env.NODE_ENV === "test"?
new DataSource({
    type:"sqlite",
    database:":memory:",
    entities:["src/entities/*.ts"],
    synchronize:true,
}):
new DataSource({
    type:"postgres",
    port:5432,
    password:process.env.POSTGRES_PWD,
    username:process.env.POSTGRES_USER,
    host:"localhost",
    database:process.env.POSTGRES_DB,
    synchronize:false,
    entities:['src/entities/*.ts'],
    migrations:['src/migrations/*.ts'],
})