import express from "express";
import cors from "cors";
import statsRoutes from "./routes/stats.routes";
import invoiceRoutes from "./routes/invoice.routes";
import vendorRoutes from "./routes/vendor.routes";
import categoryRoutes from "./routes/category.routes";
import paymentRoutes from "./routes/payment.routes";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/stats", statsRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/vendors", vendorRoutes);
app.use("/category-spend", categoryRoutes);
app.use("/cash-outflow", paymentRoutes);
app.use("/chat-with-data", chatRoutes);

// Health check (this route check that server is running fine or not)
app.get("/", (req, res) => res.send("Analytics API is running"));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





