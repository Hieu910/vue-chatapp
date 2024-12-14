import User from "../models/use.model.js";


//get user list for sidebar
export const getUsers = async (req,res)=>{
    try {
        const currentUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: currentUserId}}).select("-password")

        return res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}