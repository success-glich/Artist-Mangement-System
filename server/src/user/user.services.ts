import { Pool } from "pg";
import { IGetUsersList, User } from "./user.types";
import authHelper from "../auth/auth.helper";

class UserServices {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
    this.pool.connect();
  }
  async createUser({
    first_name,
    last_name,
    phone,
    email,
    password,
    dob,
    gender,
    address,
  }: User) {
    const client = await this.pool.connect();
    try {
      const existingUser = await client.query(
        'SELECT * FROM "user" WHERE email = $1',
        [email]
      );
      console.log(existingUser.rows.length);
      if (existingUser.rows.length > 0) throw new Error("User already exists");

      const hashedPassword = await authHelper.hash(password);

      const res = await client.query(
        'INSERT INTO "user" (first_name,last_name, email,phone, password,dob,gender,address) VALUES ($1, $2, $3, $4, $5,$6,$7,$8) RETURNING *',
        [
          first_name,
          last_name,
          email,
          phone,
          hashedPassword,
          dob,
          gender,
          address,
        ]
      );

      const user = res.rows[0];
      const newUser = JSON.parse(JSON.stringify(user));

      delete newUser.password;
      return newUser;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }

  // list users with pagination
  async getUsers(page: number = 1, limit: number = 10) {
    const client = await this.pool.connect();
    const offset = (page - 1) * limit;

    try {
      const res = await client.query(
        'SELECT id, first_name, last_name, email, phone, dob, gender, address, created_at, updated_at FROM "user" LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      return res.rows;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async updateUserById() {}
  async deleteUserById() {}
}

export default UserServices;
