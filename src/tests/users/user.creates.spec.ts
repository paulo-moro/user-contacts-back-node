import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"


const sucessUser = {
    "name":"teste",
    "email":"teste@teste.com",
    "password":"senhaforte@123",
    "phone":"41996060606"
}
const failUser = {
    "name":"teste",
    "password":"senhaforte@123",
}


describe("Create new User", ()=>{
    let connection:DataSource

    beforeAll(async ()=>{
        await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);})
    })

    afterAll( async ()=>{
        await connection.destroy()
    })

    test("Should create a new user", async ()=>{

        const response = await request(app).post("/users").send(sucessUser);

       
        expect(response.status).toBe(201)
        expect(response.body).toEqual(expect.objectContaining({
            id:response.body.id,
            name:response.body.name,
            email:response.body.email,
            phone: response.body.phone,
            created_at: response.body.created_at,
            is_adm:response.body.is_adm
        }))

        
    })
    test("Should fail to create a duplicated user", async ()=>{
        const response = await request(app).post("/users").send(sucessUser);
        expect(response.status).toBe(400)
        expect(response.body).toEqual(expect.objectContaining({
            message:"User with this email already exist"
        }))
    })
    test("Should fail to create a user without info", async ()=>{
        const response = await request(app).post("/users").send(failUser);
        expect(response.status).toBe(412)
        expect(response.body).toEqual(expect.objectContaining({
            message:"User need a name, email, password and phone to be created."
        }))
    })
    
    

})