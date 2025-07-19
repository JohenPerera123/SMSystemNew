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
  subject: "Your OTP Code - Stadium Management System",
  html: `
  <div style="background-color:#f4f6f8;padding:30px 15px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;font-family:'Segoe UI',sans-serif;">
      <tr>
        <td style="background-color:#2563eb;padding:20px;text-align:center;color:#ffffff;">
          <h1 style="margin:0;font-size:24px;">Stadium Management System</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px;color:#333333;">
          <p style="font-size:16px;margin:0 0 20px 0;">Hello,</p>
          <p style="font-size:14px;margin:0 0 20px 0;">
            You requested a One-Time Password (OTP) to verify your email address.<br />
            Use the code below within the next 5 minutes to proceed.
          </p>
          <div style="text-align:center;margin:30px 0;">
            <span style="display:inline-block;background:#e0e7ff;color:#1e3a8a;font-size:28px;font-weight:bold;padding:12px 24px;border-radius:6px;letter-spacing:4px;">
              ${otp}
            </span>
          </div>
          <p style="font-size:13px;color:#666666;">
            If you didn’t request this, you can safely ignore this email.
          </p>
          <p style="font-size:13px;color:#666666;margin-top:20px;">
            Thanks,<br />
            <strong>Stadium Management System Team</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color:#f4f6f8;text-align:center;padding:15px;font-size:11px;color:#999999;">
          &copy; 2025 Stadium Management System. All rights reserved.
        </td>
      </tr>
    </table>
  </div>`,
headers: {
    'MIME-Version': '1.0',
    'Content-Type': 'text/html; charset=UTF-8'
  }
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