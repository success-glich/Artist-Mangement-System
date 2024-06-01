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
      const error = createHttpError(400, err.message);
      next(error);
    }
  },
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit
        ? parseInt(req.query.limit as string, 10)
        : 10;

      // * business logic
      const users = await userServices.getUsers(page, limit);
      return res
        .status(201)
        .json(
          new ApiResponse(
            201,
            { currentPage: page, total: users.length, users },
            "User fetched Successfully1!"
          )
        );
    } catch (err: any) {
      console.log("Error while fetching users:", err);
      const error = createHttpError(400, err.message);
      next(error);
    }
  },
};

export default UserController;
