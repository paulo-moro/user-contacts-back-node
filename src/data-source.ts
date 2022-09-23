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
    url:process.env.DATABASE_URL,
    synchronize:false,
    logging:false,
    ssl: process.env.NODE_ENV === "production" ?
        { rejectUnauthorized: false}
        : false,
    entities:["src/entities/*.ts"],
    migrations:["src/migrations/*.ts"]
})