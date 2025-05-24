// app.ts
import express from "express";
import { Request, Response } from "express";
import snippetRouter from "./routes/snippets";
import { logger } from "./middleware/logger";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/snippets", snippetRouter);
app.use("/api/auth", authRoutes);
app.use(errorHandler);

app.get("/", (req: Request, res: Response) => {
  res.send("I am gonna rule the world");
});

export default app;
