import {Request,Response,NextFunction} from "express";

export const validateSnippet  = (req:any,res:any,next:NextFunction)=>{
    const {title,code,language} = req.body;
    if (!title || !code || !language) {
        return res.status(400).json({ 
          success: false, 
          message: "title, code and language are required fields." 
        });
    }
    next();
}