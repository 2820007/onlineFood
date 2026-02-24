import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  try {
   

    const image = req.file ? req.file.filename : null;

    const { name, email, password } = req.body;

    if (!name || !email || !password || !image) {
      return res.status(400).json({
        message: "Please provide name, email, password and image",
      });
    }

    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "User already exists with that email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new User({
      name,
      email,
      password: hashedPassword,
      image,
    });

    user = await user.save();

    res.status(201).json({
      message: "User registered successfully!",
      data: user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};



export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return res.status(400).json({
      status:400,
      success:false,
      message: "Please provide email and password",
    });
  }

  // Use findOne instead of find
  const userFound = await User.findOne({ email });

  if (!userFound) {

    return res.status(404).json({
       status:404,
      success:false,
      message: "User with email is not registered",
    });
  }

  // Compare password safely
  const isMatched = await  bcrypt.compare(password, userFound.password);

  if (!isMatched) {
    return res.status(400).json({
       status:400,
      success:false,
      message: "Credential not matched....",
    });
  }

  const token = jwt.sign(
    { 
      id: userFound._id,
      role:userFound.role,
      email:userFound.email

     }
    , process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.cookie("jwt_token",token).status(200).json({
     status:200,
     success:true,
    message: "Login successfully",
    data:userFound,
    token
    
  });
};




export const getMe=async (req,res)=>{
  res.status(200).json({
    status:200,
    success:true,
    message:"user found",
    user:req.userInfo
  })
}


export const logout = async (req, res) => {
  res.clearCookie("jwt_token").status(200).json({
    status: 200,
    success: true,
    message: "User logout successfully ! ",
  });
};