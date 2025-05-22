import express, {Request,Response} from "express";
import snippetRouter from "./routes/snippets"

const app = express();
app.use(express.json());
app.use("/api/snippets",snippetRouter);


app.get("/",(req:Request,res:Response)=>{
    res.send("I am gonna rule the world")
});

const PORT:number = parseInt(process.env.PORT || '3000',10);
app.listen(PORT,()=>{
    console.log(`My SnippetLogger - listening on port ${PORT}!`);
});