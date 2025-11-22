import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { Country } from "../entities/Country";

dotenv.config();


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,  
    username: 'root',
    password:'root',
    database: process.env.DB_NAME,
    synchronize: true, 
    logging: true,
    entities: [Country],
    driver: require('mysql2'),
})