import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "@/entities/Users";
import { Products } from "@/entities/Products";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_HOST,
  port: 1433,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,

  options: {
    encrypt: false,
  },

  extra: {
    trustServerCertificate: true,
  },

  entities: [Users, Products],
});
