import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYMQJBokcsuhB-iAXci3n3hoEzbkihsSM",
  authDomain: "cleanair-sentinel-ffddd.firebaseapp.com",
  projectId: "cleanair-sentinel-ffddd",
  storageBucket: "cleanair-sentinel-ffddd.firebasestorage.app",
  messagingSenderId: "205225272070",
  appId: "1:205225272070:web:cbc3bc3f34359380e2f487",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);