import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./src/db/configDb.js"
import userRoute from "./src/route/userRoute.js"
import cookieParser from "cookie-parser"
import productRouter from "./src/route/productRoute.js"
dotenv.config()

connectDb()
const app=express()

const PORT=process.env.PORT


//Application setting 

app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true
}))

app.use(cookieParser())






//Base endUrl

app.use("/api/user",userRoute)
app.use("/api/product",productRouter)




app.listen(PORT,()=>{
    console.log("server is running at port no.3000")
})