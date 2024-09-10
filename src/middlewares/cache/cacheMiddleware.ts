import { Request, Response, NextFunction } from "express";

interface CacheData {
  value: any;      
  timestamp: number; 
}

export const cache:{[key:string]:CacheData} = {};

const validateCache = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.originalUrl;
  if (cache[key]) {
    const data = cache[key];
    //checking expiry
    if (Date.now() - data.timestamp < 600000) {
      return res.json(data.value);
    } else {
      delete cache[key];
    }
  }
  next();
};

export {
  validateCache
}
