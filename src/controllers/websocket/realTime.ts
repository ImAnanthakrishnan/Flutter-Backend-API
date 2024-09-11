import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import io from "socket.io-client";

export const notification = asyncHandler(
  async (req: Request, res: Response) => {
    const { message } = req.body;

    if (message) {
      const socket = io("http://localhost:5000", { transports: ["websocket"] });
      socket.emit("newMessage", message);
      // Emit event to WebSocket clients
      res.status(200).json({ status: "Notification sent", message });
    } else {
      res.status(400).json({ error: "Message is required" });
    }
  }
);
