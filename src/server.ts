import express, {Request,Response} from "express";
import mongoose from 'mongoose';
import snippetRouter from "./routes/snippets";
import {logger} from "./middleware/logger";
import {errorHandler} from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(logger); //logger middleware
app.use("/api/snippets",snippetRouter);
app.use(errorHandler);


app.get("/",(req:Request,res:Response)=>{
    res.send("I am gonna rule the world")
});
const MONGO_URI = "mongodb://127.0.0.1:27017/snippetlogger";

mongoose.connect(MONGO_URI).then(()=>{
    console.log("Connected to MongoDB locally");

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

