import User from "../models/use.model.js"
import generateTokenAndSetCookie from "../utils/generateToken.js"
import bcrypt from "bcryptjs"


export const signup =async (req, res) => {
try {
    const {fullName,username,password,confirmPassword, gender} = req.body
    if(password !== confirmPassword){
        return res.status(400).json({error: "Invalid password"})
    }

    const user = await User.findOne({username: username})
    if(user) {
        return res.status(400).json({error: "username already exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    const profilePic = gender === 'male' ? `https://avatar.iran.liara.run/public/boy?username=${username}` : `https://avatar.iran.liara.run/public/girl?username=${username}`
    
    const newUser = await User.create({
        fullName,
        username,
        password: hashPassword,
        gender,
        profilePic
    })

    if(newUser){
        //Generate JWT token
        generateTokenAndSetCookie(newUser._id, res)
        await newUser.save()
        res.status(200).json({
            _id : newUser._id,
            fullName : newUser.fullName,
            username : newUser.username,
            profilePic: newUser.profilePic,
        })
    }



} catch (error) {
    res.status(500).json({error: "Internal Server Error"})
}
}

export const login =async (req, res) => {
       try {
            const {username,password} = req.body;
            const user = await User.findOne({username});
            const isPasswordCorect = await bcrypt.compare(password, user?.password || "")
            if(!user || !isPasswordCorect){
               return res.status(400).json({error: "username or password not correct"});
            }

            generateTokenAndSetCookie(user._id, res);
            res.status(200).json({  
                _id : user._id,
                fullName : user.fullName,
                username : user.username,
                profilePic: user.profilePic,
            })
        
       } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
       }
}

export const logout = (req, res) => {
    try {
       res.cookie("jwt","",{ maxAge:0 })
       res.status(200).json({ message: "logged out success" })
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}