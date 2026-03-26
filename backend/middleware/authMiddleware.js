import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

 const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // fetch user from database
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // now full user document
    next();

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};


export default authMiddleware;