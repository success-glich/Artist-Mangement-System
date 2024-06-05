import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../helper/ApiResponse";
import createHttpError from "http-errors";
import userServices from ".";

const UserController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      } = req.body;

      //* check email duplication validation
      const checkDuplicationEmail = await userServices.getUserByEmail(email);
      if (checkDuplicationEmail){
          const error = createHttpError(400, "Email already exists");
          return next(error);
      }
      // * business logic
      const registerUser = await userServices.createUser({
        first_name,
        last_name,
        email,
        password,
        phone,
        dob,
        gender,
        address,
      });

      return res
        .status(201)
        .json(
          new ApiResponse(201, registerUser, "User created Successfully1!")
        );
    } catch (err: any) {
      console.log("Error creating user:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("hello")
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;
        console.log("called")

      // * business logic
      const {users,totalCount} = await userServices.getUsers(page, limit);
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { currentPage: page, total: totalCount, users },
            "User fetched Successfully1!"
          )
        );
    } catch (err: any) {
      console.log("Error while fetching users:", err);
      const error = createHttpError(400, err.message);
      next(error);
    }
  },
  getUser:async (req:Request,res:Response,next:NextFunction)=>{
    try{
      const id = Number(req.params.id);
      const user = await userServices.getUserById(id);
      return res.status(200).json(new ApiResponse(200,user,"User fetched successfully!"));
    }catch(err:any){
      console.log("Error while fetching user:",err);
      const error = createHttpError(400,err.message);
      next(error);
    }
  },
  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      // * business logic
      await userServices.deleteUserById(id);

         return res
        .status(201)
        .json(new ApiResponse(200, "User data deleted successfully!"));
    } catch (err: any) {
      console.log("Error while deleting users:", err);
      const error = createHttpError(400, err.message);
      next(error);
    }
  },
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { first_name, last_name, email, phone, dob, gender, address } =
        req.body;

      const existingUser = await userServices.getUserById(id);
      if (!existingUser) throw new Error("User not found");

      //* Check email duplication
      if (email !== existingUser.email) {
        const checkDuplicationEmail = await userServices.getUserByEmail(email);
        if (checkDuplicationEmail){
            const error = createHttpError(400, "Email already exists");
            return next(error);
        }
      }

      await userServices.updateUserById({
        id,
        first_name,
        last_name,
        email,
        phone,
        dob,
        gender,
        address,
      });

      return res
        .status(201)
        .json(new ApiResponse(200, null, "User data updated successfully!"));
    } catch (err: any) {
      console.log("Error while updating users:", err);
      const error = createHttpError(500, err.message);
      next(error);
    }
  },
};

export default UserController;
