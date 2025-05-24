import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: any,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token required" });
  }

  const token = authHeader.split(" ")[1];

 try {
    const decoded = verifyAccessToken(token) as any;
    req.userId = decoded.id; // Using 'id' to match your JWT payload
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}; 
