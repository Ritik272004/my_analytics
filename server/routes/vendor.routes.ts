import { Router } from "express";
import { getTopVendors } from "../controllers/vendor.controller";

const router = Router();

// Get top 10 vendors by total invoice amount
router.get("/top10", getTopVendors);

export default router;

