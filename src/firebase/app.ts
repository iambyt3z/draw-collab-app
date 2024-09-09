import { FirebaseOptions, initializeApp } from "firebase/app";

const firebaseConfig: FirebaseOptions = {
    "databaseURL": "https://draw-collab-5155d-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);

export default app;
