import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/GenerateToken.js";
export const registerUser = async (req, res) => {
    try {
        const { profile, fullname, username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json("AlreadyPresent");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            profile,
            fullname,
            username,
            password: hashedPassword,
        });
        if (newUser) {
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                profile: newUser.profile,
                fullname: newUser.fullname,
                username: newUser.username,
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ message: "Invalid username" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: "Invalid password" });
        }
        generateToken(user._id, res);
        return res.status(200).json({
            _id: user._id,
            profile: user.profile,
            fullname: user.fullname,
            username: user.username,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const logoutUser = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'No JWT cookie found' });
        }
        console.log('JWT token:', token);
        res.clearCookie('jwt');
        
        console.log('JWT cookie cleared');
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}