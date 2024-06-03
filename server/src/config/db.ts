import { Pool } from 'pg';
import { config } from './config';


const pool = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: Number(config.pgPort),
  max:20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const checkConnection = async () => {
    try {
      await pool.query('SELECT NOW()'); 
      console.log('Database connection successful');
    } catch (error) {
      console.error('Database connection failed', error);
    }
  };
  
export default pool;