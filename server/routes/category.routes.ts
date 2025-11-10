import { Router } from "express";
import { getCategorySpend } from "../controllers/category.controller";

const router = Router();

// Route to get spend per category
router.get("/", getCategorySpend);

export default router;

