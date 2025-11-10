import { Router } from "express";
import { getInvoices, getInvoiceTrends } from "../controllers/invoice.controller";

const router = Router();
router.get("/", getInvoices);
router.get("/trends", getInvoiceTrends);

export default router;
