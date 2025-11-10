import { Router } from "express";
import { getCashOutflow } from "../controllers/payment.controller";

const router = Router();

// Route to get cash outflow trends
router.get("/", getCashOutflow);

export default router;

