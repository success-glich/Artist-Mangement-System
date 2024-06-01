import { Pool } from "pg";
import { User } from "./auth.types";
import authHelper from './auth.helper';
import TokenHelper from '../helper/TokenHelper';

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
   async loginUser({username, password}:Partial<User>){
    const client = await this.pool.connect();
    try{
    const existingUser = await client.query('SELECT * FROM "admin" WHERE username = $1', [username]);
    if (existingUser.rows.length === 0) {
        throw new Error('User not found');
    }
    const user = existingUser.rows[0];
    const isPasswordValid = await authHelper.compareHash(password!, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // * we can also maintain  uuid for secured purposed.
    const accessToken =await TokenHelper.generateToken({sub:user.id})
    return {accessToken,user:{
        id:user.id,
        name:user.name,
        username:user.username
    }};
    }catch(err){
        console.error('Error logging in user:', err)
        throw new Error('Error logging in user')

    }finally{
        client.release()
    }

}
}

export default AuthService