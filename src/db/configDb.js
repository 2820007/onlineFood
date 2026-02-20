import mongoose from "mongoose"


const connectDb=async()=>{
   try {
     await mongoose.connect("mongodb://localhost:27017/MomoHouse")
     console.log("database connected successfully!")
    
   } catch (error) {
    console.log(error)
    
   }
}

export default connectDb