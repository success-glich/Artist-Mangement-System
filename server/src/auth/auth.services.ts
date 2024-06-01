import { register } from 'module';
import { Pool } from "pg";
import { User } from "./auth.types";
import authHelper from './auth.helper';


class AuthService {
   private pool:Pool;

   constructor(pool:Pool){
      this.pool =pool;
      this.pool.connect();
   }
  async registerUser({name,username,password}:User){

    const client = await this.pool.connect();
    try{
    const existingUser = await client.query('SELECT * FROM "admin" WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
    }
    const hashedPassword = await authHelper.hash(password);
    
    const res = await client.query(
            'INSERT INTO "admin" (name, username, password) VALUES ($1, $2, $3) RETURNING *',
            [name, username, hashedPassword]
          );
    return res.rows[0];
    }catch(err){
        console.error('Error registering user:',err)
        throw new Error('Error registering user')
        
    }finally{
        client.release()
    }
    
   }
}

export default AuthService