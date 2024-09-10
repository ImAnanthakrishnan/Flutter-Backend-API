import jwt from "jsonwebtoken";
import { Request, Response,NextFunction } from "express";
export const authenticate = async (req:Request, res:Response, next:NextFunction) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ success: false, message: "No token,  authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
      }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err:any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token is expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};
