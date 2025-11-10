// server/controllers/chat.controller.ts
import { Request, Response } from "express";

export const chatWithData = async (req: Request, res: Response) => {
  try {
    const { question } = req.body; // user query from frontend

    // FastAPI service URL (running in ai_service)
    const fastApiUrl = process.env.FASTAPI_URL || "http://localhost:8000/chat-with-data";

    const response = await fetch(fastApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to connect with AI service" });
    }

    const data = await response.json();

    // Send the AI-generated result back to frontend
    res.json(data);

  } catch (error) {
    console.error("Error from chatWithData:", error);
    res.status(500).json({ error: "Something went wrong in chat controller" });
  }
};
