
import { DiscordSDK } from "@discord/embedded-app-sdk";
import "./game.js";

const CLIENT_ID = "1528973415476887662";
const API_URL = "https://nexo-quiz.onrender.com/api/token";

const status = document.getElementById("discordStatus");

function showStatus(message) {
  if (status) {
    status.textContent = message;
  }
}

async function connectDiscord() {
  try {
    showStatus("Connexion à Discord en cours...");

    const discordSdk = new DiscordSDK(CLIENT_ID);

    await discordSdk.ready();

    showStatus("Discord détecté. Autorisation en cours...");

    const { code } = await discordSdk.commands.authorize({
      client_id: CLIENT_ID,
      response_type: "code",
      state: "",
      prompt: "none",
      scope: ["identify"]
    });

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ code })
    });

    const data = await response.json();

    if (!response.ok || !data.access_token) {
      throw new Error(
        data.error || "Échec de l'échange du code Discord."
      );
    }

    const auth = await discordSdk.commands.authenticate({
      access_token: data.access_token
    });

    if (!auth) {
      throw new Error("Authentification Discord impossible.");
    }

    const username =
      auth.user?.global_name ||
      auth.user?.username ||
      "joueur";

    showStatus(`Connecté à Discord : ${username}`);

    console.log("NEXO QUIZ : authentification Discord réussie.");

  } catch (error) {
    console.error("Erreur de connexion Discord :", error);

    showStatus(
      "Discord non connecté. Le jeu reste disponible dans le navigateur."
    );
  }
}

connectDiscord();
