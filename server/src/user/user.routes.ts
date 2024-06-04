import { Router } from "express";
import UserController from "./user.controller";
import AuthMiddleware from "../auth/auth.middleware";
import { validateUser, validateUserUpdate } from "../middleware/validators";

const userRouter = Router();

userRouter.use(AuthMiddleware.isAuthenticated);

userRouter
  .route("/")
  .get(UserController.getUsers)
  .post(validateUser, UserController.createUser);

userRouter
  .route("/:id")
  .get(UserController.getUser)
  .put(validateUserUpdate,UserController.updateUser)
  .delete(UserController.deleteUser);



export default userRouter;
