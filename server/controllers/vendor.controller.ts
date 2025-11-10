import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getTopVendors = async (req: Request, res: Response) => {
  try {
    // 1️⃣ Fetch all vendors with invoices
    const vendors = await prisma.vendor.findMany({
      include: { invoices: true },
    });

    // 2️⃣ Compute total invoice amount per vendor
    const vendorsWithTotals = vendors.map((vendor: { invoices: any[]; }) => {
      const totalAmount = vendor.invoices.reduce(
        (sum, inv) => sum + (inv.total || 0),
        0
      );
      return { ...vendor, totalInvoiceAmount: totalAmount };
    });

    // 3️⃣ Sort by totalInvoiceAmount descending
    vendorsWithTotals.sort((a: { totalInvoiceAmount: number; }, b: { totalInvoiceAmount: number; }) => b.totalInvoiceAmount - a.totalInvoiceAmount);

    // 4️⃣ Take top 10
    const topVendors = vendorsWithTotals.slice(0, 10);

    res.status(200).json(topVendors);
  } catch (error) {
    console.error("Error fetching top vendors:", error);
    res.status(500).json({ error: "Failed to fetch top vendors" });
  }
};

