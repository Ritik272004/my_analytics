"use client";
import { useState } from "react";
import { postData } from "@/lib/api";

export default function ChatBox() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!question.trim()) return;
    try {
      const data = await postData("chat-with-data", { question });
      setResponse(JSON.stringify(data, null, 2));
    } catch {
      setResponse("❌ Failed to connect to backend.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Chat with Data</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border p-2 rounded-md"
          placeholder="Ask a question about your data..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      <pre className="bg-gray-50 p-4 rounded-md h-64 overflow-auto text-sm">
        {response || "Ask something..."}
      </pre>
    </div>
  );
}
