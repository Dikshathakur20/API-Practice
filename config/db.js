import dotenv from "dotenv";
dotenv.config();  // MUST come before using process.env

import sql from "mssql";

console.log("DB_SERVER =", process.env.DB_SERVER);
console.log("Type of DB_SERVER =", typeof process.env.DB_SERVER);

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER, // must be a string
  database: process.env.DB_NAME,
  options: { encrypt: true, trustServerCertificate: true },
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(dbConfig);
    console.log("Connected to MSSQL");
    return pool;
  } catch (err) {
    console.error("DB Connection Failed:", err);
    throw err;
  }
};
