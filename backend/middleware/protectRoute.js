import jwt from "jsonwebtoken";
import User from "../models/use.model.js";

const protectRoute =async (req, res, next) => {
    try {
        const token = req.cookies.jwt
   
        if(!token) {
            return res.status(401).json({error: "Unauthorized: No token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({error: "Unauthorized: Invalid_token"})
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({error: "User not found"})
        }

        req.user = user

        next()
    } catch (e) { 
        console.log(e)
        res.status(500).json({error: "Internal Server Error"})
    }
}

export default protectRoute