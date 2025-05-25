// routes/auth.ts
import express from "express";
import { register, login, refreshToken, logout,getMe } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Refresh token to get new access token
router.post("/refresh-token", refreshToken);

// Logout user (invalidate refresh token)
router.post("/logout", logout);

//me
router.get("/me", authMiddleware, getMe);

export default router;
