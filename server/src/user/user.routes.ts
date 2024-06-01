import { Router } from "express";
import UserController from "./user.controller";
import AuthMiddleware from "../auth/auth.middleware";
import { validateUser } from "../middleware/validators";

const userRouter = Router();

userRouter.use(AuthMiddleware.isAuthenticated);

userRouter
  .route("/")
  .get(UserController.getUsers)
  .post(validateUser, UserController.createUser);

export default userRouter;
