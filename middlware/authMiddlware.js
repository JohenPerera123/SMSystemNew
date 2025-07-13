import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(' ')[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_KEY);
    } catch (err) {
      return res.status(401).json({ success: false, error: "Invalid or expired token" });
    }

    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return res.status(403).json({ success: false, error: "User not found" });
    }

    req.username = user; 
    next();
  } catch (error) {
    console.error("verifyUser middleware error:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
};

export default verifyUser;
