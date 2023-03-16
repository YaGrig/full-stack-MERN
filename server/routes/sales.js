import express from "express";
import { getSales } from "../controllers/sales.js";

const router = express.Router();
// THERE IS MULTIPLE SALES PAGES, BUT ALL OF THEM USE THE SAME INFO SO ONLY 1 ROUTE
router.get("/sales", getSales);

export default router;
