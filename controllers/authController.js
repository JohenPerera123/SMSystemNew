import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

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


export{login, verify , register}