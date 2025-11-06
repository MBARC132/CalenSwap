import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';
const JWT_SECRET = "secret_key";
export default async function authMiddleware(req, res, next) {
    try{
        const authHeader = req.headers.authorization;
        console.log("🧾 Auth Header:", req.headers.authorization);

        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message: "Authorization token missing"});
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token,JWT_SECRET);

        const user = await UserModel.findById(decoded.id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }

        req.user = user;
        next();
    } catch(error){
        console.error("Auth Middleware Error:", error.message);
        return res.status(401).json({message:"Invalid or expaired token"})
    }
}