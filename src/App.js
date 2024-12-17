
import { getToken } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { messaging } from './firebase';
import { toast, ToastContainer } from "react-toastify";
import Message from "./components/Message";
import "react-toastify/dist/ReactToastify.css";
import {  onMessage } from "firebase/messaging";


const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Request permission to receive notifications
    const getNotificationPermission = async () => {
      try {
        // Requesting permission to show notifications
        await Notification.requestPermission();

        // Get the FCM token
        const currentToken = await getToken(messaging, {
          vapidKey: "BGJ-WWQQBKHsO4OM60zYYWKlJVyVXtGqfBDiwzoy5Apzr3dGZYDUkEaC3uqFtKHEjPnLTGMolhxAXWv71DBXSQo", // Replace with your actual VAPID Key for web
        });

        if (currentToken) {
          console.log("FCM Token:", currentToken);
          setToken(currentToken);

          // Send the token to your backend API (Node.js)
          await sendTokenToBackend(currentToken);
        } else {
          console.log("No registration token available.");
        }
      } catch (error) {
        console.error("Error while retrieving FCM token:", error);
      }
    };

    getNotificationPermission();
  }, []);

  const sendTokenToBackend = async (token) => {
    const userId = "12345"; // Example user ID, replace with actual
    const response = await fetch("http://localhost:5000/register-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, registrationToken: token }),
    });
    const data = await response.json();
    console.log(data);
  };

  onMessage(messaging, (payload) => {
    console.log("incoming msg", payload);
    toast(<Message notification={payload.notification} />);
  });

  return (
    <div>
      <h1>Push Notification Setup</h1>
      {token ? <p>FCM Token: {token}</p> : <p>Requesting notification permission...</p>}
      <ToastContainer />
    </div>
  );
};

export default App;
