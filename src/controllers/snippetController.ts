import {Request,Response} from "express";
import CodeSnippet from "../models/CodeSnippet";

//fetch all snippet
export const getAllSnippets = async (req:Request,res:Response)=>{
    try{
        const snippets = await CodeSnippet.find();
        res.json(snippets);
    } catch(error){
        res.status(500).json({ error: "Failed to fetch snippets", details: error });
    }
};

// fetch specific id snippet
export const getById = async (req :any, res:any)=>{
    try{
        const snippet = await CodeSnippet.findById(req.params.id);
        
        if(!snippet){
            return res.status(404).json({error:"Snippet not found"});
        }
        res.json(snippet);

    } catch(error){
        res.status(500).json({ error: "Failed to fetch snippet", details: error });
    }

    };

    //create snippet
export const addSnippet = async (req:any,res:any)=>{
    try{
        const {title,code,language} = req.body 

        if(!title || !code || !language){
            return res.status(400).json({error: "Title, code and language are required"});
        }

        const newSnippet = new CodeSnippet({
            title,
            code,
            language,
        });
        
        const savedSnippet = await newSnippet.save();
        
        res.status(201).json(newSnippet);
    } catch(error){
        res.status(500).json({error: "Failed to create snippet", details: error });
    }
};



// delete snippet by id
export const deleteById =  async (req:any,res:any)=>{
    try{
        const deletedSnippet = await CodeSnippet.findByIdAndDelete(req.params.id);

        if(!deletedSnippet){
            return res.status(404).json({error:"Snippet not found"}); 
        }
        res.json({message: "Snippet deleted successfully"})

    } catch(error){
        res.status(500).json({ error: "Failed to delete snippet", details: error });
    }
};

// update snippet by ID
export const updateById= async (req:any,res:any)=>{
    try{
        const {title,code,language}=req.body;
        
        const updatedSnippet = await CodeSnippet.findByIdAndUpdate(
            req.params.id,
            { title, code, language },
            { new: true, runValidators: true }
          );

          if (!updatedSnippet) {
            return res.status(404).json({ error: "Snippet not found" });
        }
        res.json({message:"Snippet updated",snippet:updatedSnippet});
    } catch(error){
        res.status(500).json({ error: "Failed to update snippet", details: error });
    }
};

