import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";

// REGISTER ADMIN
export const registerAdmin = async (req, res) => {
try {
const { email, password } = req.body;
const hashed = bcrypt.hashSync(password, 10);


const pool = await connectDB();
await pool
  .request()
  .input("email", email)
  .input("password", hashed)
  .input("role", "admin")
  .input("user_name",email)
  .query(
    `INSERT INTO tbladmins_rows_diksha (email, password, role,user_name)
     VALUES (@email, @password, @role, @user_name)`
  );

const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

res.json({ message: "Admin registered", token });


} catch (err) {
res.status(500).json({ error: err.message });
}
};

// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
try {
const { email, password } = req.body;


const pool = await connectDB();
const result = await pool
  .request()
  .input("email", email)
  .query(`SELECT * FROM tbladmins_rows_diksha WHERE email = @email`);

if (result.recordset.length === 0)
  return res.status(400).json({ error: "Admin not found" });

const admin = result.recordset[0];

const match = bcrypt.compareSync(password, admin.password);
if (!match) return res.status(400).json({ error: "Incorrect password" });

const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

res.json({ message: "Login successful", token });


} catch (err) {
res.status(500).json({ error: err.message });
}
};

// GENERATE TOKEN FOR EXISTING ADMIN
export const generateToken = async (req, res) => {
try {
const { email } = req.params;


const pool = await connectDB();
const result = await pool
  .request()
  .input("email", email)
  .query(`SELECT * FROM tbladmins_rows_diksha WHERE email = @email`);

if (result.recordset.length === 0)
  return res.status(404).json({ error: "Admin not found" });

const admin = result.recordset[0];

const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, {
  expiresIn: "1d",
});

res.json({ token });


} catch (err) {
res.status(500).json({ error: err.message });
}
};
