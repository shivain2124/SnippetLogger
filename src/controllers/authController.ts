import { Request, Response, NextFunction } from "express";
import User from "../models/user";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt";

// register user
export const register = async (req:any,res:any,next:NextFunction)=>{
    try{
        const {email,password} = req.body;

        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({ message: "Email already registered" });
        }

         // Create new user
        const user = await User.create({ email, password });

        // Generate tokens for the new user
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({ message: "User registered successfully",accessToken, refreshToken 
    });
    } catch(error){
        next(error);
    }
};


//login
export const login = async (req: any, res: any, next: NextFunction) => {
    try{
        const { email, password } = req.body;

         // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
        }
            // Generate new tokens
        const accessToken = generateAccessToken(user._id.toString());
        const refreshToken = generateRefreshToken(user._id.toString());

            // Update refresh token in database
        user.refreshToken = refreshToken;
        await user.save();

        res.json({ 
        message: "Login successful",
        accessToken, 
        refreshToken 
    });
    } catch (error) {
    next(error);
    } 
};

// refresh token
export const refreshToken = async (req: any, res: any, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    // Check if refresh token is provided
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    // Find user with this refresh token
    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Verify the refresh token
    verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id.toString());

    res.json({ 
      message: "Token refreshed successfully",
      accessToken: newAccessToken 
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

//logout
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.body;

    // Find user and clear their refresh token
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};
