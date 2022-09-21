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

    let contactId:string

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        

        const newUser = await request(app).post("/users").send(sucessUser); 
        
        const login =  await request(app).post("/users/login").send(sucessLogin);

        token = login.body.token;

        const createContactresponse = await request(app).post("/contact").set("Authorization", `Bearer ${token}`).send(sucessContact);

        contactId = createContactresponse.body.id
    })

    afterAll( async ()=>{
        await connection.destroy()
    })

    test("Should delete a contact", async ()=>{              

        const response  = await request(app).delete(`/contact/${contactId}`).set("Authorization", `Bearer ${token}`).send()
        expect(response.status).toBe(204)
        
    })

    test("Trying To delete a user without a token", async ()=>{
        
        const response = await request(app).delete(`/contact/${contactId}`).send()

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))

    })

    
})