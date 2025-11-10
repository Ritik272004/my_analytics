"use client";

import ChartCard from "@/components/ChartCard";
import ChatWithData from "@/components/ChatWithData";

export default function Page() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard title="Revenue Overview" />
        <ChartCard title="Category Spend" />
      </div>
      <ChatWithData />
    </div>
  );
}


