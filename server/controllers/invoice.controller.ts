import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ Fetch invoices with optional search
export const getInvoices = async (req: Request, res: Response) => {
  const { search } = req.query;

  // Use Prisma.QueryMode for case-insensitive search
  const whereClause = search
    ? {
        invoiceNo: {
          contains: String(search),
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {};

  try {
    const invoices = await prisma.invoice.findMany({
      where: whereClause,
      include: {
        vendor: true,
        customer: true,
        lineItems: true,
        payments: true,
      },
      orderBy: { invoiceDate: "desc" }, // Optional: latest invoices first
    });

    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
};

// ✅ Get invoice trends grouped by date
export const getInvoiceTrends = async (req: Request, res: Response) => {
  try {
    const trends = await prisma.invoice.groupBy({
      by: ["invoiceDate"],
      _sum: { total: true },
      orderBy: { invoiceDate: "asc" },
    });

    res.status(200).json(trends);
  } catch (error) {
    console.error("Error fetching invoice trends:", error);
    res.status(500).json({ error: "Failed to fetch invoice trends" });
  }
};




