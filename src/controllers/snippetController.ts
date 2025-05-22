import {Request,Response} from "express";
import { snippets, Snippet } from "../data/snippets";

export const getAllSnippets = (req:Request,res:Response)=>{
    res.json(snippets);
};

export const addSnippet = (req:any,res:any)=>{
    const {title,code} = req.body 

    if(!title || !code){
        return res.status(400).json({error: "Title and code are required"});
    }

    const newSnippet:Snippet = {
        id:snippets.length+1,
        title,
        code,
        createdAt:new Date(),
    };
    
    snippets.push(newSnippet);
    res.status(201).json(newSnippet);
};


export const getById = (req :any, res:any)=>{
        const id = parseInt(req.params.id);
        const snippet = snippets.find((s)=>s.id===id);

        if(!snippet){
            return res.status(404).json({error:"Snippet not found"});
        }
        res.json(snippet);
    };

export const deleteById = (req:any,res:any)=>{
    const id = parseInt(req.params.id);
    const index= snippets.findIndex((s)=> s.id===id);

    if(index===-1){
        return res.status(404).json({error:"Snippet not found"}); 
    }

    snippets.splice(index,1);
    res.json({message:"Snippets deleted successfully"});
};

export const updateById=(req:any,res:any)=>{
    const id=parseInt(req.params.id);
    const {title,code}=req.body;

    const snippet = snippets.find((s) => s.id === id);

    if (!snippet) {
        return res.status(404).json({ error: "Snippet not found" });
    }
    if(title) snippet.title = title;
    if(code) snippet.code=code;

    res.json({message:"Snippet updated",snippet});
}

