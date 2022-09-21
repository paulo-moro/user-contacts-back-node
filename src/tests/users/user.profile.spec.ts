import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"


const sucessUser = {
    "name":"teste",
    "email":"teste@teste.com",
    "password":"senhaforte@123",
    "phone":"41990000808"
}
const sucessLogin ={
    "email":"teste@teste.com",
    "password":"senhaforte@123"
}
const updatedData = {
    name:"test3"
}

describe("Test get user profile",()=>{
    let connection:DataSource

    let userId:string

    beforeAll( async ()=>{
        await AppDataSource.initialize()
        .then((res)=> (connection =res))
        .catch((err)=>console.error("Failure on Database Initialization", err))
        
        const createdUserRes = await request(app).post("/users").send(sucessUser);

        userId = createdUserRes.body.id
    })

    afterAll( async ()=>{
        await connection.destroy()
    })
   
    test("Should return the user data", async ()=>{        
       
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        
        const response = await request(app).get(`/users/${userId}`).set("Authorization", `Bearer ${token}`).send()

        expect(response.status).toBe(200)
        expect(response.body).toEqual(expect.objectContaining({
            id:response.body.id,
            name:response.body.name,
            email:response.body.email,
            phone: response.body.phone,
            created_at: response.body.created_at,
            is_adm:response.body.is_adm,
            contacts:response.body.contacts
        }))
        
        

    })
    test("Should fail to return the user data without token", async ()=>{       
        
        const response = await request(app).patch(`/users/${userId}`).send()

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))
    })
})
