import mongoose, { mongo } from "mongoose";

const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true,
    },
     productPrice:{
        type:Number,
        required:true,
    },
     productDescription:{
        type:String,
        required:true,
    },

     productStockQnt:{
        type:Number,
        required:true,
    }
    ,
     productStatus:{
        type:String,
        enum:["available","unavailable"],
        default:"available"
    },
    image: {
        type:String,
        required:true

    }
})


const Product=mongoose.model("Product",productSchema)
export default Product