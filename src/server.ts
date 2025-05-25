// server.ts
import mongoose from "mongoose";
import app from "./app";

const MONGO_URI = "mongodb://127.0.0.1:27017/snippetlogger";
const PORT = 5000;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB locally");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
