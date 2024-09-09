import { getDatabase } from "firebase/database";
import app from "./app";

const db = getDatabase(app);

export default db;
