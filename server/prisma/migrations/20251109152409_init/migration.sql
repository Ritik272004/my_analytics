-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "taxId" TEXT,
    "partyNum" TEXT,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "analyticsId" TEXT,
    "fileName" TEXT,
    "vendorId" TEXT,
    "customerId" TEXT,
    "invoiceNo" TEXT,
    "invoiceDate" TIMESTAMP(3),
    "deliveryDate" TIMESTAMP(3),
    "subTotal" DOUBLE PRECISION,
    "taxTotal" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "currency" TEXT,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT,
    "dueDate" TIMESTAMP(3),
    "netDays" INTEGER,
    "bankAccount" TEXT,
    "discountedTotal" DOUBLE PRECISION,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LineItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT,
    "srNo" INTEGER,
    "description" TEXT,
    "quantity" DOUBLE PRECISION,
    "unitPrice" DOUBLE PRECISION,
    "totalPrice" DOUBLE PRECISION,
    "sachkonto" TEXT,
    "vatRate" DOUBLE PRECISION,
    "vatAmount" DOUBLE PRECISION,

    CONSTRAINT "LineItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LineItem" ADD CONSTRAINT "LineItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
