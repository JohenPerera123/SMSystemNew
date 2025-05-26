import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const login = async (req, res) => {

        try{
            const {email, password} = req.body;
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({success:false, error: "User not found"})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
                return res.status(400).json({success:false, error: "Wrong password"});
            }

            const token = jwt.sign({_id: user._id, role: user.role},
                process.env.JWT_KEY, {expiresIn: "10d"}
            )

            res.status(200).json({success: true, 
                token, 
                user:
                {_id: user._id, 
                username: user.username, 
                role: user.role}
            });


        }catch(error){
            res.status(500).json({success: false, error: "Server Error"})

        }
}

const verify = (req, res) => {
    return res.status(200).json({success: true, user: req.username})
}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            username,
            email,
            password: hashedPassword,
            role: "user", // Default role
        });

        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: "Server Error" });
    }
};

const otpStore = new Map();

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ success: false, error: "Email not found" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, otp);

  // Send Email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`
  });

  setTimeout(() => otpStore.delete(email), 300000); // 5 min expiry
  return res.status(200).json({ success: true, message: "OTP sent to email" });
};


export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otpStore.get(email);

  if (!storedOtp || storedOtp !== otp) {
    return res.status(400).json({ success: false, error: "Invalid or expired OTP" });
  }

  const token = jwt.sign({ email }, process.env.JWT_KEY, { expiresIn: "10m" });
  otpStore.delete(email);
  return res.status(200).json({ success: true, token });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const email = decoded.email;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, error: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    return res.status(400).json({ success: false, error: "Invalid or expired token" });
  }
};

export{login, verify , register}