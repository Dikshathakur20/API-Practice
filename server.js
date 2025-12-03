import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import adminRoutes from "./routes/adminRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/employees", employeeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
