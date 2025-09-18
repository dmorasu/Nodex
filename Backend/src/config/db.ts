import { Sequelize } from 'sequelize-typescript'
import dontenv from 'dotenv'
dontenv.config()


export const db=new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:Number(process.env.DB_PORT),
    dialect:'postgres',
    models:[__dirname+"/../models/**/*"],
    logging:false
    



})