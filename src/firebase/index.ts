import { FirebaseOptions, initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
    "apiKey": import.meta.env.VITE_FIREBASE_API_KEY,
    "appId": import.meta.env.VITE_FIREBASE_APP_ID,
    "authDomain": import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    "databaseURL": import.meta.env.VITE_FIREBASE_DATABASE_URL,
    "measurementId": import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    "messagingSenderId": import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    "projectId": import.meta.env.VITE_FIREBASE_PROJECT_ID,
    "storageBucket": import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getDatabase(app);

const firebase = {
    analytics,
    db
};

export default firebase;
