import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  connectFirestoreEmulator,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxV1H4zmGOI4T0OaRcSGOydMOEjxdF-vI",
  authDomain: "greatwar-interactive.firebaseapp.com",
  projectId: "greatwar-interactive",
  storageBucket: "greatwar-interactive.appspot.com",
  messagingSenderId: "45713546235",
  appId: "1:45713546235:web:6715995ea7e9f65950c95e",
  measurementId: "G-1CNYEM4KM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
  connectFirestoreEmulator(db, "localhost", 8080);
}

if (!import.meta.env.DEV) {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      "6LcgdzQpAAAAAKS2u1yTcgVXd4ZpRtg-NDc4bkCu"
    ),

    // Optional argument. If true, the SDK automatically refreshes App Check
    // tokens as needed.
    isTokenAutoRefreshEnabled: true,
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export { analytics, app, db, auth };
