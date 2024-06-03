import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import TokenHelper from "../helper/TokenHelper";
import pool from "../config/db";
import { User } from "./auth.types";
interface UserRequest extends Request {
  user?: User | null;
}

const AuthMiddleware = {
  isAuthenticated: async (
    req: UserRequest,
    res: Response,
    next: NextFunction
  ) => {
    const client = await pool.connect();
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      const error = createHttpError(401, "Bearer token is not provided");
      return next(error);
    }

    const [bearer, token] = bearerToken.split(" ");
    if (bearer !== "Bearer") {
      const error = createHttpError(401, "Bearer token is not provided");
      return next(error);
    }

    try {
      const { sub: id } = await TokenHelper.verifyToken(token);
   
      const user = await client.query('SELECT * FROM "admin" WHERE id = $1', [
        id,
      ]);
      req.user = user.rows[0];
      next();
    } catch (err) {
      console.log("auth middleware ::", err);
      const error = createHttpError(401, "Invalid token");
      return next(error);
    }finally{
      client.release();
    }
  },
};

export default AuthMiddleware