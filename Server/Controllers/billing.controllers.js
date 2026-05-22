import { plans } from "../Config/plans.js";

export const billing=async(req,res)=>{
    try {
     const {planType}=req.body;
     const user=req.userId;
     const plan=plans[planType]
     if(!plan || plan.price==0){
     return res.status(400).json({
        message:"invalid plan plans"
     })
     }     
    } catch (error) {
        
    }
}