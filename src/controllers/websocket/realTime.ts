import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import io from "socket.io-client";

export const notification = asyncHandler(
  async (req: Request, res: Response) => {
    const { message } = req.body;

    if (message) {
      const server = process.env.NODE_ENV = "development" ? process.env.DEVELOPMENT_SERVER : process.env.PRODUCTION_SERVER
      const socket = io(`${server}`, { transports: ["websocket"] });
      socket.emit("newMessage", message);
      // Emit event to WebSocket clients
      res.status(200).json({ status: "Notification sent", message });
    } else {
      res.status(400).json({ error: "Message is required" });
    }
  }
);
