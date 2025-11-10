import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getCategorySpend = async (req: Request, res: Response) => {
  try {
    // Group line items by description (category) and sum totalPrice
    const categories = await prisma.lineItem.groupBy({
      by: ["description"],           // group by category
      _sum: { totalPrice: true },    // sum totalPrice per category
      orderBy: { _sum: { totalPrice: "desc" } }, // optional: sort descending
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching category spend:", error);
    res.status(500).json({ error: "Failed to fetch category spend" });
  }
};

