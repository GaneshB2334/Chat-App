import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    profile: String,
    fullname: String,
    username: String,
    password: String,
    cnfpassword: String,
});

const User = mongoose.model("User", UserSchema);

export default User;