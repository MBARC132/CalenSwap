import UserModel from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
    try {
        const {name, email, password} = req.body;
        if(!name | !email | !password) {
            return res.status(400).json({message:"All fields are required"})
        }

        const existinguser = await UserModel.findOne({email});

        if(existinguser) {
            return res.status(409).json({ message:"User already registered"})
        }
        const hashedpassword = await bcrypt.hashSync(password, 10);

        const newUser = await UserModel.create({
            name,
            email,
            password:hashedpassword,
        })
        res.status(201).json({
            message:"User Registered Successfully",
            user:{
                id:newUser._id,
                name:newUser.name,
                email:newUser.email,
            }
        })
    } catch(error) {
        console.log("Error during Registration", error);
        res.status(500).json({message:"Error during registration"})
    }
}

const JWT_SECRET = "secret_key";

export async function signin(req, res) {
    try{
        const { email, password } = req.body;

        if(!email | !password ){
            return res.status(400).json({message:"Email and password are required"})
        }
        const user = await UserModel.findOne({ email });
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Credentials"})
        }

        const token = jwt.sign(
            {id:user._id, email:user.email},
            JWT_SECRET,
            {expiresIn: "10h"}
        )

        res.status(200).json({
            message:"Login Successful",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            }
        })
    } catch(error){
        console.error("Error during login:", error)
        res.status(500).json({message:"Error during login"})
    }
}