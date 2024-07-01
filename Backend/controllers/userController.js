import User from "../models/User.js";

const getUsers = async (req, res) => {
    try {
        const loggedInUser = req.user;
        if (!loggedInUser) {
            return res.status(401).json({ message: 'Not authorized, please login' });
        }

        const users = await User.find({ _id: { $ne: loggedInUser._id } }).select('-password');
        res.json(users);
    } catch (error) {
        console.log("Error in getUsers controller: ", error);
        res.status(500).json({ message: 'Server error' });
    }
}

const updateProfile = async (req, res) => {
    try {
        const profileUser = req.user;
        const user = await User.findByIdAndUpdate(profileUser._id, { profile: req.body.profile }, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export { updateProfile, getUsers }