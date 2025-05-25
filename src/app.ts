// app.ts
import express from "express";
import cors from "cors";
import { Request, Response } from "express";
import snippetRouter from "./routes/snippets";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Needed for cookies (in later steps)
  })
);

app.use(express.json());
app.use(logger);
app.use("/api/snippets", snippetRouter);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("I am gonna rule the world");
});

export default app;
