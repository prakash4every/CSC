import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ GET route (browser test के लिए)
app.get("/", (req, res) => {
  res.send("ROOT WORKING ✅");
});
app.get("/chat", (req, res) => {
  res.send("Chat route working ✅");
});

// ✅ POST route (API call के लिए)
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
            content: "आप CSC अलीपुर डिजिटल सहायक हैं। हमेशा 'अलीपुर' सही वर्तनी में लिखें। केवल हिंदी में संक्षिप्त और स्पष्ट उत्तर दें। भारतीय सरकारी सेवाओं और CSC सेवाओं से संबंधित जानकारी दें।"
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