import { NextFunction, Request, Response } from "express"
import { register } from "module"
import { ApiResponse } from "../helper/ApiResponse"
import authService from "."
import createHttpError from "http-errors"

const AuthController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, username, password } = req.body

            // * business logic
            const registerUser = await authService.registerUser({ name, username, password });

            return res.status(201).json(new ApiResponse(201, registerUser, "Register successfully!"));
        } catch (err: any) {
            console.log("Error creating user:", err);
            const error = createHttpError(400, err.message);
            next(err);
        }
    },
    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {  username, password } = req.body

            // * business logic
            const loginUser = await authService.loginUser({ username, password });

            return res.status(201).json(new ApiResponse(201, loginUser, "Login successfully!"));
        } catch (err: any) {
            console.log("Error creating user:", err);
            const error = createHttpError(400, err.message);
            next(error);
        }
    },
}

export default AuthController