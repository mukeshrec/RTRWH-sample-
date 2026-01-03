import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

// Check credentials but don't crash immediately (better for debugging)
if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ WARNING: Missing Supabase credentials in .env file.");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "RTRWH Backend API Server",
    status: "running",
    timestamp: new Date(),
    endpoints: {
      health: "GET /health",
      aquifer: "POST /api/aquifer",
      rainfall: "POST /api/rainfall",
      elevation: "POST /api/elevation",
      waterBodies: "POST /api/water-bodies",
    },
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Backend server is running", timestamp: new Date() });
});

// Supabase Aquifer Data
app.post("/api/aquifer", async (req, res) => {
  try {
    const { state, region } = req.body;

    if (!state || typeof state !== "string") {
      return res.status(400).json({ error: "Please provide a valid state." });
    }

    const { data, error } = await supabase
      .from("aquifer_mapping")
      .select("*")
      .eq("state", state)
      .eq("region", region || null)
      .single();

    if (error) {
      // If no data found, return null instead of error 400
      if (error.code === 'PGRST116') return res.json(null);
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gemini AI Chatbot Proxy
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, locationContext } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Please provide a valid message." });
    }

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      console.error("Gemini API key not configured");
      return res.status(500).json({ error: "Gemini API key not configured" });
    }

    const systemPrompt = `You are Varun AI, an expert rainwater harvesting assistant.
    User Location Context: ${JSON.stringify(locationContext || {})}
    Answer questions about rainwater harvesting, costs, and technical design based on Indian CGWB standards.`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt + "\n\nUser: " + message }] }]
        }),
      }
    );

    const data = await geminiResponse.json();
    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";

    res.json({ response: botResponse });
  } catch (error) {
    console.error("Chatbot API error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Backend server running at http://localhost:${PORT}`);
  console.log(`➜  Health check: http://localhost:${PORT}/health`);
});