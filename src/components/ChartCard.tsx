"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface Props {
  title: string;
}

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 700 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 800 },
];

export default function ChartCard({ title }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

