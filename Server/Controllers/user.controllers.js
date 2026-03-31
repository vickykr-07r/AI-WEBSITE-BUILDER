import isAuth from "../Middlewares/IsAuth.js";
import User from "../Models/user.model.js";
export const getcurrentuser=async(req,res)=>{
    try {
        const user=await User.findById(req.userId);
        if(!user){
        return res.status(401).json({
            message:"User not found"
        })
        }

        return res.status(200).json(user)
    } catch (error) {
       return res.status(401).json({
       message: "Unauthorized: Invalid or expired token"
       }); 
    }
}