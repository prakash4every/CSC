import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are CSCALIPUR Digital Assistant. Answer only in Hindi. Give short, clear answers related to Indian government and CSC services."
          },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ reply: "कुछ तकनीकी समस्या है, कृपया बाद में प्रयास करें।" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require("express");
const app = express();

app.use(express.json());

// 👇 यहाँ GET route add करो
app.get("/chat", (req, res) => {
  res.send("Chat route working ✅");
});

// 👇 तुम्हारा existing POST route
app.post("/chat", async (req, res) => {
   ...
});

// 👇 सबसे नीचे listen होना चाहिए
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});