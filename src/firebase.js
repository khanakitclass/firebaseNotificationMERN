// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";


const firebaseConfig = {
  apiKey: "AIzaSyCKYjJ9tLpimVjbaz5cNr1kpV-SCcuBQG4",
  authDomain: "webdemo-b0a30.firebaseapp.com",
  projectId: "webdemo-b0a30",
  storageBucket: "webdemo-b0a30.firebasestorage.app",
  messagingSenderId: "358789189715",
  appId: "1:358789189715:web:fd80ba046a189340acb6a6",
  measurementId: "G-3WDG2KBT9E",
  vapidKey: "BGJ-WWQQBKHsO4OM60zYYWKlJVyVXtGqfBDiwzoy5Apzr3dGZYDUkEaC3uqFtKHEjPnLTGMolhxAXWv71DBXSQo"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export { messaging, getToken };  // Export getToken
