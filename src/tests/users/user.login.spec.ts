import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users.entity"

const sucessUser = {
    "name":"teste",
    "email":"teste@teste.com",
    "password":"senhaforte@123",
    "phone":"41996060606"
}
const sucessLogin = {
    "email":"teste@teste.com",
    "password":"senhaforte@123",
}
const failUser = {
    "name":"teste",
    "password":"senhaforte@123",
}

const failLoginWrong = {
    "email":"teste@teste.com",
    "password":"senhaforte@1234",
}

const failLoginWrong2 = {
    "email":"teste1@teste.com",
    "password":"senhaforte@123",
}

describe("Login a new User",()=>{
    let connection:DataSource

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))  
        const newUser = await request(app).post("/users").send(sucessUser);
        const userRepository = AppDataSource.getRepository(User)
        
    })

    afterAll( async ()=>{
        await connection.destroy()
    })    

    test("Should login a user", async ()=>{
        
        const response = await request(app).post("/users/login").send(sucessLogin)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")

    })
    test("Should fail to login a user with a invalid password", async ()=>{     
      

        const response = await request(app).post("/users/login").send(failLoginWrong)

        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Wrong email/password."            
        }))
    })
    test("Should fail to login a user with a invalid email", async ()=>{

        const response = await request(app).post("/users/login").send(failLoginWrong2)
        failLoginWrong2
        expect(response.status).toBe(403)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Wrong email/password."            
        }))
    })
})
