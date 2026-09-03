import connectDb from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";


dotenv.config({
    path:'./env'
})
connectDb()
.then(()=>{
    app.on("error" , (error)=>{
        console.log("Errror" , error);
        throw error;
    })

    app.listen(process.env.PORT ||8080 , ()=>{
        console.log(`Server is listening at port  ${process.env.PORT}`)
    })
})
.catch((err)=> {
    console.log("MongoDb connection failed",err);
})