import { Router } from "express";
import { deleteUser, getDashboard } from "../controllers/adminController.js";
import { isAdmin, isAuthenticated } from "../middlewares/authMiddleware.js";

const adminRoutes = Router();

adminRoutes.use(isAuthenticated, isAdmin);
adminRoutes.get("/dashboard", getDashboard);
adminRoutes.delete("/users/:id", deleteUser);

export default adminRoutes;
