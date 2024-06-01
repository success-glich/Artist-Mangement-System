import {body,validationResult}from "express-validator";
import {Request,Response,NextFunction} from "express";
import { ApiResponse } from "../helper/ApiResponse";

export const validateAdminRegister = [
    body('name')
    .notEmpty()
    .withMessage('Name is required'),
    body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({max:255}).withMessage('Password must be at least 6 characters'),
    body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .withMessage('Password must be at least 6 characters'),

    (req:Request,res:Response,next:NextFunction)=>{
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json(new ApiResponse(400,{error:error.array()}))
        }
        next()
    }
];

