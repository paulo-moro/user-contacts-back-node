import app from "./app";
import { AppDataSource } from "./datasource";

const init = async () =>{
    await AppDataSource.initialize().then(
        ()=>console.log('Database initialized')
    ).catch((err)=>
        console.error("Error during Data Source initialization", err)
    )
    
    const port = process.env.PORT || 3000

    app.listen(port, ()=>{
        console.log(`Running at http://localhost:${port}`)
    })
}


init()