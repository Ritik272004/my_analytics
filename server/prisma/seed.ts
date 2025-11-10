import prisma from "../services/prisma.service"; 
import fs from "fs";
import path from "path";

async function main() {
  console.log("Seeding database...");

  // 1. Read JSON file
  const dataPath = path.join(__dirname, "../../data/Analytics_Test_Data.json");
  const rawData = fs.readFileSync(dataPath, "utf-8");
  const jsonData = JSON.parse(rawData);

  // 2. Seed Vendors
  const vendorMap = new Map<string, string>();
  if (jsonData.vendors && Array.isArray(jsonData.vendors)) {
    for (const vendorData of jsonData.vendors) {
      const vendor = await prisma.vendor.create({
        data: {
          name: vendorData.name,
          address: vendorData.address || null,
          taxId: vendorData.taxId || null,
          partyNum: vendorData.partyNum || null,
        },
      });
      vendorMap.set(vendorData.name, vendor.id);
    }
  }

  // 3. Seed Customers
  const customerMap = new Map<string, string>();
  if (jsonData.customers && Array.isArray(jsonData.customers)) {
    for (const customerData of jsonData.customers) {
      const customer = await prisma.customer.create({
        data: {
          name: customerData.name || null,
          address: customerData.address || null,
        },
      });
      customerMap.set(customerData.name, customer.id);
    }
  }

  // 4. Seed Invoices, LineItems, Payments
  if (jsonData.invoices && Array.isArray(jsonData.invoices)) {
    for (const invoiceData of jsonData.invoices) {
      const vendorId = invoiceData.vendor ? vendorMap.get(invoiceData.vendor) : null;
      const customerId = invoiceData.customer ? customerMap.get(invoiceData.customer) : null;

      const invoice = await prisma.invoice.create({
        data: {
          analyticsId: invoiceData.analyticsId || null,
          fileName: invoiceData.fileName || null,
          invoiceNo: invoiceData.invoiceNo || null,
          invoiceDate: invoiceData.invoiceDate ? new Date(invoiceData.invoiceDate) : null,
          deliveryDate: invoiceData.deliveryDate ? new Date(invoiceData.deliveryDate) : null,
          subTotal: invoiceData.subTotal || null,
          taxTotal: invoiceData.taxTotal || null,
          total: invoiceData.total || null,
          currency: invoiceData.currency || null,
          vendorId,
          customerId,
        },
      });

      // Line items
      if (invoiceData.lineItems && Array.isArray(invoiceData.lineItems)) {
        for (const item of invoiceData.lineItems) {
          await prisma.lineItem.create({
            data: {
              invoiceId: invoice.id,
              srNo: item.srNo || null,
              description: item.description || null,
              quantity: item.quantity || null,
              unitPrice: item.unitPrice || null,
              totalPrice: item.totalPrice || null,
              sachkonto: item.sachkonto || null,
              vatRate: item.vatRate || null,
              vatAmount: item.vatAmount || null,
            },
          });
        }
      }

      // Payments
      if (invoiceData.payments && Array.isArray(invoiceData.payments)) {
        for (const payment of invoiceData.payments) {
          await prisma.payment.create({
            data: {
              invoiceId: invoice.id,
              dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
              netDays: payment.netDays || null,
              bankAccount: payment.bankAccount || null,
              discountedTotal: payment.discountedTotal || null,
            },
          });
        }
      }
    }
  }

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // <- disconnect singleton after seeding
  });


