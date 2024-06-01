import { HttpError } from "http-errors";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";

const globalErrorHandler = (err:HttpError,req:Request,res:Response,next:NextFunction)=>{

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success:false,
        message:err.message || "Internal Server error",
        stack:config.env==="development"? err.stack : null
    })
}

export default globalErrorHandler;