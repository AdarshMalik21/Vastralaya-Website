import { User } from "../Model/user.model.js";
import bcrypt from "bcryptjs"

export const createAdmin = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        const userExits = await User.findOne({email});
        if(userExits)
            return res.status(400).json({message: "User already exists"})

        const hashedPassword = await bcrypt.hash(password,10)

        const admin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin",
        });
        res.status(201).json(admin);
    }
    catch(error){
        res.status(500).json({message: error.message});
    };
};

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password");
        res.json(users);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};