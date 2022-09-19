import app from "./app";

const init = () =>{
    app.listen(3000, ()=>{
        console.log('App running at port 3000')
    })
}


init()