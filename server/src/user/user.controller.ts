import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import userServices from ".";


const UserController ={
    createUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { first_name,last_name,email,password,phone,dob,gender,address } = req.body

            // * business logic
            const registerUser = await userServices.createUser({ first_name,last_name,email,password,phone,dob,gender,address });
            
            return res
            .status(201)
            .json(new ApiResponse(201, registerUser, "User created Successfully1!"));
        } catch (err: any) {
            console.log("Error creating user:", err);
            const error = createHttpError(400, err.message);
            next(error);
        }
    },

}

export default UserController;