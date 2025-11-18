# 📊 Business Analytics Dashboard — Full-Stack + AI Powered

A production-grade **Business Analytics Dashboard** built with a modern monorepo architecture.  
It provides real-time business insights, interactive charts, AI-driven analytics, and a pixel-accurate UI based on the provided Figma design.

---

## 🛠️ Tech Stack

### **Frontend (Next.js)**
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-chartjs-2 (Chart.js wrapper)

### **Backend (Express + Prisma)**
- Node.js
- Express.js (TypeScript)
- PostgreSQL (Docker container)
- Prisma ORM
- REST APIs

### **AI Layer**
- Vanna AI (self-hosted)
- Groq LLM for SQL generation
- FastAPI (Python) server
- RAG-based natural language querying

### **Deployment**
- Frontend & Backend → **Vercel**
- AI Service (Vanna) → **Render / Railway / Fly.io / Docker**

---

## ✨ Features

### 🔍 Interactive Analytics Dashboard
- Pixel-perfect UI based on Figma dashboard  
- Dynamic data fetched from backend APIs  
- Key metric cards:
  - Total Spend (YTD)
  - Total Invoices Processed
  - Documents Uploaded
  - Average Invoice Value

### 📈 Visual Reports & Charts
- Invoice Volume & Value Trend (Line Chart)
- Spend by Vendor (Top 10 Bar Chart)
- Spend by Category (Pie Chart)
- Cash Outflow Forecast (Bar Chart)

### 📄 Invoice Table
- Searchable  
- Sortable  
- Scrollable  
- Displays vendor, date, invoice number, amount, status  
- Backend endpoint: `/invoices`

---

## 🤖 “Chat With Data” — AI Analytics

Ask natural-language questions such as:

- *“What's the total spend in the last 90 days?”*  
- *“List top 5 vendors by total spend.”*  
- *“Show overdue invoices as of today.”*

### 🔁 AI Flow
1. User enters question  
2. Frontend calls `/chat-with-data` (Express backend)  
3. Backend sends query to Vanna AI FastAPI server  
4. Vanna AI uses **Groq** to generate SQL  
5. SQL runs on PostgreSQL database  
6. Results + generated SQL returned to UI  

### 💬 UI Displays:
- AI-generated SQL  
- Query result table  
- Streaming AI response  

---

## 🧩 Dataset & Data Modeling

### Input File
`Analytics_Test_Data.json`  
Contains:
- Vendors  
- Customers  
- Invoices  
- Payments  
- Line Items  

### 📚 Normalized Relational Database (PostgreSQL + Prisma)

#### 📌 Main Tables
- **Vendor**
- **Customer**
- **Invoice**
- **LineItem**
- **Payment**
- **Document**

## 📌 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ritik272004/my_analytics.git
   cd lms


