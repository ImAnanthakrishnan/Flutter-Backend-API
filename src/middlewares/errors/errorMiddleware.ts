import { Request, Response, NextFunction } from 'express';
import logger from '../../helpers/logger';

const notFound = (req:Request,res:Response,next:NextFunction)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}


const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    logger.error({
        message: message || 'An error occurred',
        stack: err.stack,
        statusCode: statusCode || 500
      });
      
      res.status(statusCode).json({
        status:'error',
        message:message || 'Internal Server Error'
      })
};

export {notFound,errorHandler};