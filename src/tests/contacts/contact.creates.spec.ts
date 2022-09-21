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
const sucessLogin = {
    "email":"teste@teste.com",
    "password":"senhaforte@123",
}

const sucessContact = {
    "name":"teste2",
    "email":"teste2@teste.com",
    "phone":"4199877777"
}
const failContact = {
    "name":"teste2",
    "phone":"4199877777"
}
describe("Create Contact",  () =>{
    let connection:DataSource

    let token:string 

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        

        const newUser = await request(app).post("/users").send(sucessUser); 
        
        const login =  await request(app).post("/users/login").send(sucessLogin);

        token = login.body.token;
    })

    afterAll( async ()=>{
        await connection.destroy()
    })

    test("Should create a new contact", async ()=>{              

        const response = await request(app).post("/contact").set("Authorization", `Bearer ${token}`).send(sucessContact);
        console.log(response.body)
        expect(response.status).toBe(201)
        expect(response.body).toEqual(expect.objectContaining({
            id:response.body.id,
            name:response.body.name,
            phone:response.body.phone,
            email:response.body.email
        }))
    })

    test("Should fail to create a duplicated contact", async ()=>{

        await request(app).post("/contact").set("Authorization", `Bearer ${token}`).send(sucessContact)
        const response = await request(app).post("/contact").set("Authorization", `Bearer ${token}`).send(sucessContact);

        expect(response.status).toBe(409)
        expect(response.body).toEqual(expect.objectContaining({
            message:"User already have this contact"
        }))
    })

    test("Should fail to create a contact missing info", async ()=>{        

        const response = await request(app).post("/contact").set("Authorization", `Bearer ${token}`).send(failContact);
        
        expect(response.status).toBe(412)
        expect(response.body).toHaveProperty("message")
    })
    
    test("Should fail to create a contact without token", async ()=>{    
        
        const response = await request(app).post("/contact").send(sucessContact);
        
        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        })) 
    })
})