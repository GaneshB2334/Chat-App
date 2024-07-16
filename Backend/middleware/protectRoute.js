import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protectRoute = async (req, res, next) => {
    try {
        let token = await req.cookies.jwt;
        
        token = token || localStorage.getItem('jwt');

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute middleware: ", error);
        res.status(500).json({ message: 'Not authorized, token failed error' });
    }
};

export default protectRoute;