import { validateAdminRegister, validateLogin } from './../middleware/validators';
import { Router } from "express";
import AuthController from "./auth.controller";

const authRouter = Router();

authRouter.post("/register",validateAdminRegister,AuthController.register)

authRouter.post("/login",validateLogin,AuthController.login)


export default authRouter