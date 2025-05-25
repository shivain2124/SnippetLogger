import {Request,Response} from "express";
import CodeSnippet from "../models/codeSnippet";
import { AuthenticatedRequest } from "../middleware/authMiddleware";


//fetch all snippet
export const getAllSnippets = async (req:AuthenticatedRequest,res:Response)=>{
    try{
        const snippets = await CodeSnippet.find({  createdBy: req.userId });
        res.json(snippets);
    } catch(error){
        res.status(500).json({ error: "Failed to fetch snippets", details: error });
    }
};

// fetch specific id snippet
export const getById = async (req :AuthenticatedRequest, res:any)=>{
    try{
        const snippet = await CodeSnippet.findById({ _id: req.params.id, createdBy: req.userId });
        
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
            createdBy: req.userId,

        });
        
        const savedSnippet = await newSnippet.save();
        
        res.status(201).json(newSnippet);
    } catch(error){
        res.status(500).json({error: "Failed to create snippet", details: error });
    }
};



// delete snippet by id
export const deleteById =  async (req:AuthenticatedRequest,res:any)=>{
    try{
        const deletedSnippet = await CodeSnippet.findByIdAndDelete({_id: req.params.id,
  createdBy: req.userId,});

        if(!deletedSnippet){
            return res.status(404).json({error:"Snippet not found or unauthorized"}); 
        }
        res.json({message: "Snippet deleted successfully"})

    } catch(error){
        res.status(500).json({ error: "Failed to delete snippet", details: error });
    }
};

// update snippet by ID
export const updateById= async (req:AuthenticatedRequest,res:any)=>{
    try{
        const {title,code,language}=req.body;
        
        const updatedSnippet = await CodeSnippet.findByIdAndUpdate(
           { _id: req.params.id,  createdBy: req.userId },
            { title, code, language },
            { new: true, runValidators: true }
          );

          if (!updatedSnippet) {
            return res.status(404).json({ error: "Snippet not found or unauthorized" });
        }
        res.json({message:"Snippet updated",snippet:updatedSnippet});
    } catch(error){
        res.status(500).json({ error: "Failed to update snippet", details: error });
    }
};

