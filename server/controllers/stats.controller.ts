import { Request, Response } from "express";
import prisma from "../services/prisma.service";

export const getStats = async (req: Request, res: Response) => {
  try {
    // aggregate invoices
    const totalInvoices = await prisma.invoice.count();
    const totalSpend = await prisma.invoice.aggregate({
      _sum: { total: true }, // ✅ correct field name
    });

    const documentsUploaded = await prisma.document.count();

    const avgInvoiceValue = totalInvoices
      ? (totalSpend._sum.total ?? 0) / totalInvoices
      : 0;

    res.json({
      totalSpend: totalSpend._sum.total ?? 0,
      totalInvoices,
      documentsUploaded,
      avgInvoiceValue,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

