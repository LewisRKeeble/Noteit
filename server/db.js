import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.SQLUSERNAME,
  host: process.env.HOST,
  password: process.env.SQLPASSWORD,
  port: process.env.PORT,
  database: "todo",
});

export default pool;
