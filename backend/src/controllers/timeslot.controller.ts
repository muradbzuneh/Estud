import { Request, Response } from "express";
import timeSlot from "../models/timeSlot.js";

export const createTimeSlot = async (req: Request, res: Response)=>{
    try
    {
        const {startTime, endTime, capacity} = req.body
    

    const slot = await timeSlot.create({startTime, endTime, capacity})
    res.status(201).json({
        message: "Timeslot scucessfult created",
        slot

    })
    }
    catch (error:any){
        res.status(500).json({ message: "server error", error: error.massage})
    }

}

export const getTimeSlot = async (req: Request, res: Response) =>{
    try{
        const slots = await timeSlot.find().sort({startTime:1})
        res.status(200).json(slots)
    }
    catch (error:any){
 res.status(500).json({message:"server error", error: error.massage})
   }
}