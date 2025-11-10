import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getCashOutflow = async (req: Request, res: Response) => {
  try {
    // Group payments by dueDate and sum discountedTotal
    const cashOutflow = await prisma.payment.groupBy({
      by: ["dueDate"],                     // ✅ correct field
      _sum: { discountedTotal: true },     // ✅ correct numeric field
      orderBy: { _sum: { discountedTotal: "asc" } }, // sort by total amount
    });

    res.status(200).json(cashOutflow);
  } catch (error) {
    console.error("Error fetching cash outflow:", error);
    res.status(500).json({ error: "Failed to fetch cash outflow" });
  }
};

