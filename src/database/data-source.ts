import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

import { Country } from "../entities/Country";
import User from "../entities/User"
import { AuditLog } from "../entities/Audit";

dotenv.config();


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),  
    username: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    entities: [User, Country,AuditLog],
    driver: require('mysql2'),
    synchronize: true,
    dropSchema: true, 

})