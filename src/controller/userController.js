import User from "../model/userModel.js";

export const register = async (req, res) => {
  const image = req.file.filename;

  const { name, email, password } = req.body;

  if (!name || !email || !password || !image) {
    return res.status(400).json({
      message: "Please provide name , email , role and password of user",
    });
  }

  // check the user already exists or not

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(400).json({
      message: "user already exists with that email..",
    });
  }

  //hashed the password




 try {
     let  user = await new User({
    name,
    email,
    password,
    image,
  });
  user=await user.save();

  res.status(200).json({
    message: "user register  successfully!!",
    data: user,
  });
    
 } catch (error) {
    res.status(500).json({
    message: "internal server error!!",
     error
  })
    
 }


};

