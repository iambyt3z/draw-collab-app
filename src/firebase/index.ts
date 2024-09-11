import { FirebaseOptions, initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig: FirebaseOptions = {
    "apiKey": "AIzaSyBDUcdRcpd9NR3ldyvqyL2FwyTE9Rxp6XA",
    "appId": "1:506447633648:web:f1532cc3c78b7ab1cf7635",
    "authDomain": "draw-collab-5155d.firebaseapp.com",
    "databaseURL": "https://draw-collab-5155d-default-rtdb.firebaseio.com",
    "measurementId": "G-LT7HCXPJE2",
    "messagingSenderId": "506447633648",
    "projectId": "draw-collab-5155d",
    "storageBucket": "draw-collab-5155d.appspot.com"
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const db = getDatabase(app);

const firebase = {
    analytics,
    db
};

export default firebase;
