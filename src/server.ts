// // server.ts
// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";
// import app from "./app";

// const MONGO_URI =  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/snippetlogger";
// const PORT = process.env.PORT || 8080;

// mongoose
//   .connect(MONGO_URI)
//   .then(() => {
//     console.log("Connected to MongoDB ");
//     app.listen(PORT, () => {
//       console.log(`Server running at http://localhost:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect to MongoDB", err);
//   });


// server.ts (keep this file)
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app"; // Your existing app.ts

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/snippetlogger";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

// Add DB connection middleware to your app
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

export default app;
