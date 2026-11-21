import { Router } from "express";
import {
  deleteAccount,
  login,
  signup,
  updateProfile,
} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.patch("/me", isAuthenticated, updateProfile);
authRoutes.delete("/account", isAuthenticated, deleteAccount);

export default authRoutes;
