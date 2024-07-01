import UserGroup from "../models/UserGroup.js";
export const createGroup = async (req, res) => {
    const adminId = req.user._id;
    const { groupName, groupImage, members } = req.body;

    const Group = await UserGroup.findOne({ adminId: adminId, members: members })

    if (Group) {
        return res.json({ message: "Group already exists" })
    }

    await UserGroup.create({
        adminId: adminId,
        groupImage: groupImage,
        groupName: groupName,
        members: members
    }).then(res => {
        returnres.json(
            {
                message: "Group Created Successfully"
            },
            {
                id: res._id,
                adminId: res.adminId,
                groupName: res.groupName,
                groupImage: res.groupImage
            })
    }).catch(err=>{
        console.log("Error in creating Group -->",err);
    })
}