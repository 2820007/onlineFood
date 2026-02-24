import express from "express"
import { getMe, logout, register, userLogin } from "../controller/userController.js"
import upload from "../middleware/upload.js"
import authMid from './../middleware/isAuthenticate.js';


const userRoute=express.Router()

userRoute.post("/register",upload.single("image") ,register)
userRoute.post("/login" ,userLogin)
userRoute.get("/logout" ,authMid,logout)
userRoute.get("/getMe" ,authMid,getMe)

export default userRoute