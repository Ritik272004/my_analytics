// server/routes/chat.routes.ts
import { Router } from "express";
import { chatWithData } from "../controllers/chat.controller";

const router = Router();

// When frontend sends a POST request to /chat-with-data,
// this route will send it to the FastAPI AI service
router.post("/", chatWithData);

export default router;

