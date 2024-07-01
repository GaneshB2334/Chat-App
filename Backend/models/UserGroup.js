import mongoose from "mongoose";

const UserGroupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    groupImage: {
        type: String,
        default: null,
    }
}, { timestamps: true });

const UserGroup = mongoose.model('UserGroup', UserGroupSchema);

export default UserGroup;