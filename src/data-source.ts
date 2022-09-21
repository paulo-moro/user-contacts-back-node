import { DataSource } from "typeorm";
import "dotenv/config"


export const AppDataSource = 
process.env.NODE_ENV === "test"?
new DataSource({
    type:"sqlite",
    database:":memory:",
    entities:["src/entities/*.ts"],
    synchronize:true,
}): new DataSource({
    type:"postgres",
    host:process.env.DB_HOST,
    port:5432,
    username:process.env.POSTGRES_USER,
    password:process.env.POSTGRES_PWD,
    database:process.env.POSTGRES_DB,
    synchronize:false,
    logging:false,
    entities:["src/entities/*.ts"],
    migrations:["src/migrations/*.ts"]
})