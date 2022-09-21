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



describe("Delete user profile",()=>{
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
    
    test("Trying to delete a user with token", async ()=>{
        const login =  await request(app).post("/users/login").send(sucessLogin);
        const {token} = login.body 
        const userResponse  = await request(app).get("/users").set("Authorization", `Bearer ${token}`).send()

        const user = userResponse.body
        
        const response = await request(app).delete(`/users/${userId}`).set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(204)

    })
    test("Trying To delete a user without a token", async ()=>{
        
        const response = await request(app).delete(`/users/${userId}`)

        expect(response.status).toBe(401)
        expect(response.body).toEqual(expect.objectContaining({
            message:"Missing authorization token"
        }))

    })
    
})