import express from "express";
import { getEmployees } from "../controllers/employeeController.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", verifyAdmin, getEmployees);

export default router;
