import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;


// Access Token – expires 15 minutes
export const generateAccessToken = (userId: string): string => {
  if (!userId) {
    throw new Error('User ID is required for token generation');
  }
  return jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};


// Refresh Token –  expires (7 days)
export const generateRefreshToken = (userId: string): string => {
  if (!userId) {
    throw new Error('User ID is required for token generation');
  }
  return jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};


// Verify Access Token
export const verifyAccessToken = (token:string)=>{
    if(!token){
        throw new Error("Toke is required");
    }
    return jwt.verify(token,ACCESS_TOKEN_SECRET);
};


// Verify Refresh Token
export const verifyRefreshToken = (token: string) => {
  if (!token) {
    throw new Error('Token is required');
  }
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
