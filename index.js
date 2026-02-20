import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./src/db/configDb.js"
import userRoute from "./src/route/userRoute.js"
dotenv.config()

connectDb()
const app=express()

const PORT=process.env.PORT


//Application setting 

app.use(express.json())
app.use(cors())





//Base endUrl

app.use("/api/user",userRoute)




app.listen(PORT,()=>{
    console.log("server is running at port no.3000")
})