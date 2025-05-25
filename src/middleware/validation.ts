import { Request, Response, NextFunction } from "express";

// Comprehensive list of supported programming languages
const allowedLanguages = [
  "javascript", "typescript", "python", "java", "c++", "c",
];

export const validateSnippet = (req: any, res: any, next: NextFunction) => {
  const { title, code, language } = req.body;

  // Validate title
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ 
      error: "Title is required and cannot be empty." 
    });
  }

  if (title.length > 100) {
    return res.status(400).json({ 
      error: "Title must be under 100 characters." 
    });
  }

  // Validate code
  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ 
      error: "Code is required and cannot be empty." 
    });
  }

  if (code.length > 1000) { // Increased limit for larger code snippets
    return res.status(400).json({ 
      error: "Code must be under 1,000 characters." 
    });
  }

  // Validate language
  if (!language || typeof language !== "string") {
    return res.status(400).json({
      error: "Language is required and must be a string.",
    });
  }

  if (!allowedLanguages.includes(language.toLowerCase())) {
    return res.status(400).json({
      error: `Language must be one of: ${allowedLanguages.join(", ")}`,
    });
  }

  // Sanitize inputs (optional but recommended)
  req.body.title = title.trim();
  req.body.code = code.trim();
  req.body.language = language.toLowerCase();

  next();
};
