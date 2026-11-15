
const express = require("express");
require("dotenv").config();

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://sir-sugo.github.io");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("NEXO QUIZ API fonctionne !");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "NEXO QUIZ" });
});

app.post("/api/token", async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        error: "Code OAuth manquant"
      });
    }

    const params = new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      grant_type: "authorization_code",
      code
    });

    const response = await fetch(
      "https://discord.com/api/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Erreur OAuth Discord :", data);
      return res.status(400).json({
        error: "Échec de l'authentification Discord"
      });
    }

    res.json({
      access_token: data.access_token
    });

  } catch (error) {
    console.error("Erreur serveur :", error);
    res.status(500).json({
      error: "Erreur interne du serveur"
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`NEXO QUIZ API démarrée sur le port ${PORT}`);
});
