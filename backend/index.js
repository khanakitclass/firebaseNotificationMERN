const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const admin = require("./utils/firebaseNotification");  // Import Firebase Admin SDK

const app = express();
app.use(bodyParser.json());

app.use(cors());

const userTokens = new Map(); // Store FCM tokens (In production, store in a DB)

// Endpoint to register the FCM token
app.post("/register-token", (req, res) => {
  const { userId, registrationToken } = req.body;

  if (!userId || !registrationToken) {
    return res.status(400).json({ error: "UserId and Token are required" });
  }

  userTokens.set(userId, registrationToken);
  console.log(`User ${userId} registered token: ${registrationToken}`);
  
  res.status(200).json({ message: "Token registered successfully" });
});

// Endpoint to send push notifications
app.post("/send-notification", async (req, res) => {
  const { userId, title, body } = req.body;

  const registrationToken = userTokens.get(userId);
  if (!registrationToken) {
    return res.status(404).json({ error: "User not found or token missing" });
  }

  const message = {
    notification: {
      title,
      body,
    },
    token: registrationToken,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Notification sent:", response);
    res.status(200).json({ message: "Notification sent successfully" });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification" });
  }
});

// Start the server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));