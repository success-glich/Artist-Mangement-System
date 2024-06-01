import {config as dotenv} from 'dotenv';
dotenv();

const _config = {
    port:String(process.env.PORT),
    pgUser:String(process.env.PG_USER),
    pgHost:String(process.env.PG_HOST),
    pgDatabase:String(process.env.PG_DATABASE),
    pgPassword:String(process.env.PG_PASSWORD),
    pgPort:String(process.env.PG_PORT),
    env:String(process.env.NODE_ENV),
    saltRounds:Number(process.env.SALT_ROUNDS),
    jwtSecret:String(process.env.JWT_SECRET),
    jwtExpiration:String(process.env.JWT_EXPIRATION)
   

}
export const config = Object.freeze(_config);