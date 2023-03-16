import express from "express";
import { getAdmins, getUserPerfomance } from "../controllers/management.js";

const router = express.Router();

router.get("/admin", getAdmins);
router.get("/perfomance/:id", getUserPerfomance);

export default router;
