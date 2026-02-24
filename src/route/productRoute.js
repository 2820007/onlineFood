import express from "express"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controller/productController.js"
import upload from "../middleware/upload.js"

const productRouter=express.Router()

productRouter.post("/create",upload.single("image"),createProduct)
productRouter.get("/",getProducts)
productRouter.get("/:id",getProduct)
productRouter.delete("/:id",deleteProduct)
productRouter.patch("/:id",updateProduct)
export default productRouter