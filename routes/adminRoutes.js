import express from "express";
import { registerAdmin, loginAdmin, generateToken } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/generate-token/:username", generateToken);

export default router;
