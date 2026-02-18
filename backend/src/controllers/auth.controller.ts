import { Request, Response } from "express";
import bcrypt from "bcrypt"
import  Jwt  from "jsonwebtoken";
import User from "../models/userModels.js";

export const loginStudent = async(req:Request, res:Response) =>{
    try {
        const {email, password} = req.body  
        const student = await User.findOne({email}) 

        if(!student){
            return res.status(400).json({message : "invalid credintial"})
        }

        const isMatch = await bcrypt.compare(password, student.password)

        if(!isMatch){
            return res.status(400).json({message: "Invalid credenytial"})
        }

     const token = Jwt.sign(
       { id: student.id, role: student.role},
       process.env.JWT_SECRET as string,
       {expiresIn : process.env.JWT_EXPIRES_IN}
        )
     res.status(200).json({
        message:"Login sucesssfuly",
        token,
        student:{
            id:student.id,
            name:student.name,
            email:student.email
        }
        
     })
     console.log("User Role:", req.userRole)
   console.log("Allowed Roles:", roles) 
    }  
    catch(error: any){
        res.status(500).json({message:"server error", error: error.message})
    }
}