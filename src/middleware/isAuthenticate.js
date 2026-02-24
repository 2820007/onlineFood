import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

const authMid = async (req, res, next) => {
  try {
    const token = req.cookies.jwt_token;

    if (!token) {
      return res.status(403).json({ success: false, message: "Token not provided!" });
    }

    const verified_token = jwt.verify(token, process.env.SECRET_KEY);

    const userInfo = await User.findById(verified_token.id);

    if (!userInfo) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    req.userInfo = userInfo;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or malformed token", error: error.message });
  }
};

export default authMid;