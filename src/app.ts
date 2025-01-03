import express, { NextFunction, Request, Response } from "express";
import  { Pool } from "pg";
import dotenv from "dotenv";

const app = express();
dotenv.config(); //Reads .env file and makes it accessible via process.env

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

const connectToDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to DB");
  } catch (error) {
    console.error("Error connecting to DB", error);
  }
};

connectToDB();