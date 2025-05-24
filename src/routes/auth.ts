// routes/auth.ts
import express from "express";
import { register, login, refreshToken, logout } from "../controllers/authController";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login existing user
router.post("/login", login);

// Refresh token to get new access token
router.post("/refresh-token", refreshToken);

// Logout user (invalidate refresh token)
router.post("/logout", logout);

export default router;
