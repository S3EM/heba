import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNRva0FDKUsqpeAjSr3ckQuvwdbZkA8lM",
  authDomain: "ai-studio-applet-webapp-bdc52.firebaseapp.com",
  projectId: "ai-studio-applet-webapp-bdc52",
  storageBucket: "ai-studio-applet-webapp-bdc52.firebasestorage.app",
  messagingSenderId: "332805039417",
  appId: "1:332805039417:web:c611abd14c8b5742c2b4e8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
