import { connectDB } from "../config/db.js";

export const getEmployees = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`SELECT * FROM dbo.tblemployees_rows_diksha`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
