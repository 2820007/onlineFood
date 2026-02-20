import express from "express"
import { register } from "../controller/userController.js"
import upload from "../middleware/upload.js"

const userRoute=express.Router()

userRoute.post("/register",upload.single("image") ,register)

export default userRoute