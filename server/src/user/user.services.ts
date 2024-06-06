import { Pool } from "pg";
import { User } from "./user.types";
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
    if(offset<0){
      throw new Error("Invalid page number");
    }

    try {
      const res = await client.query(
        'SELECT id, first_name, last_name, email, phone, dob, gender, address, created_at, updated_at FROM "user" LIMIT $1 OFFSET $2',
        [limit, offset]
      );
      const totalCountResult = await client.query('SELECT COUNT(*) FROM "user"');

      return{ users:res.rows,
        totalCount:Number(totalCountResult.rows[0].count)
      };
    } catch (err: any) {
      console.error("Error while fetching users from database:", err.message);

      throw new Error("Failed to fetch users.Please try again later.");
    } finally {
      client.release();
    }
  }
  async updateUserById({
    id,
    first_name,
    last_name,
    phone,
    email,
    dob,
    gender,
    address,
  }: Omit<User, "password">) {
    const client = await this.pool.connect();

    try {
      const query = `
      UPDATE "user"
      SET 
        first_name = $1,
        last_name = $2,
        email = $3,
        phone = $4,
        dob = $5,
        gender = $6,
        address = $7
        WHERE id = $8`;
      const values = [
         first_name,
        last_name,
        email,
        phone,
        dob,
        gender,
        address,
        id
      ];

      const res = await client.query(query, values);
      
      if(res.rowCount===0) throw new Error("Something wrong when updating users");
      return;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }

  async deleteUserById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('DELETE FROM "user" WHERE id = $1', [id]);
      return res.rows;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getUserById(id: number) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT * FROM "user" WHERE id = $1', [
        id,
      ]);
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getUserByEmail(email: string) {
    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT * FROM "user" WHERE email = $1', [
        email,
      ]);

      return res?.rowCount !== 0 ? true : false;
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }
  }
  async getUserCount(){

    const client = await this.pool.connect();
    try {
      const res = await client.query('SELECT COUNT(*) FROM "user"');
      return res.rows[0];
    } catch (err: any) {
      throw new Error(err);
    } finally {
      client.release();
    }

  }
}
export default UserServices;
