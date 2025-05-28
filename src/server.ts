// server.ts
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

const MONGO_URI =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/snippetlogger";
const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB ");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
