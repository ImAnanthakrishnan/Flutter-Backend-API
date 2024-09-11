import asyncHandler from "express-async-handler";
import { Request,Response } from "express";
import { io } from "../..";

export const notification = asyncHandler(async(req:Request,res:Response) => {
    const { message } = req.body;
    // Emit the message to all connected clients
    io.emit('newMessage', message);
 
    res.status(200).send({ success: true, message: 'Notification sent to all clients' });
})