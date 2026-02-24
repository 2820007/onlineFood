import Product from "../model/productModel.js";

export const createProduct = async (req, res) => {
  const image = req.file.filename;
  const {
    productName,
    productDescription,
    productPrice,
    productStockQnt,
    productStatus,
  } = req.body;

  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStockQnt ||
    !productStatus ||
    !image
  ) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const product = await new Product({
      productName,
      productDescription,
      productPrice,
      productStatus,
      productStockQnt,
      image,
    });
    await product.save();
    res.status(200).json({
      status: 200,
      success: true,
      message: "product created successfully..",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    // console.log(products)
    if (products.length == 0) {
      return res.status(400).json({
        message: "There is no projects yet",
        data: [],
      });
    }
    res.status(200).json({
      status: 200,
      success: true,
      message: "Products fetched successfully...",
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//get single product
export const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Please provide product id",
    });
  }
  

  try {
    const product = await Product.find({ _id: id });

    if (product.length ==0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Product does not exist with that ID",
        data: [],
      });
    }

    res.status(200).json({
      status: 200,
      success: true,
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


export const deleteProduct=async(req,res)=>{
     const { id } = req.params;

  if (!id) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Please provide product id",
    });
  }

 try {
     const product = await Product.findById(id);
  if (!product) {

    return res.status(404).json({
         status:404,
         success:false,

         message: "Product not found."
         });
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
     status:200,
     success:true,
     message: "Product deleted successfully." 
    });
    
 } catch (error) {
     res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });

    
 }

}


export const updateProduct=async(req,res)=>{
    const { id } = req.params;
  const {
    productName,
    productDescription,
    productPrice,
    productStockQnt,
    productStatus,
  } = req.body || {};

  // Validation
  if (
    !productName ||
    !productDescription ||
    !productPrice ||
    !productStockQnt ||
    !productStatus 
    
  ) {
    return res.status(400).json({
        status:400,
        success:false,
      message:
        "Please provide productName, productDescription, productPrice, productStockQnt, productStatus and id",
    });
  }

  try {
     const oldData = await Product.findById(id);
  if (!oldData) {
    return res.status(404).json({
          status:404,
        success:false,

      message: "Product not found with that id.",
    });
  }


  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      productName,
      productDescription,
      productPrice,
      productStockQnt,
      productStatus,
      image
    },
    { new: true }, // return updated document
  );

  res.status(200).json({
    message: "Product updated successfully.",
    product: updatedProduct,
  });
    
  } catch (error) {
     res.status(500).json({
      status: 500,
      success: false,
      message: "Internal server error",
      error: error.message,
    });
    
  }
}
