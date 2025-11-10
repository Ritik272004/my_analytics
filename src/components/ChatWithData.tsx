"use client";

import { useState } from "react";
import { postData } from "@/lib/api";

export default function ChatWithData() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const data = await postData("chat-with-data", { question });
      setResponse(JSON.stringify(data, null, 2));
    } catch {
      setResponse("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-2xl">
      <h2 className="text-xl font-semibold mb-3">Chat with Data (AI Assistant)</h2>
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your analytics data..."
          className="flex-grow border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
        />
        <button
          onClick={handleAsk}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </div>
      {response && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2 whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}

