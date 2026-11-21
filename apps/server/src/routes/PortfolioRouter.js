import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadPortfolioImages } from "../middlewares/multer.js";
import {
  createPortfolio,
  deletePortfolio,
  deleteMyPortfolios,
  getMyPortfolio,
  getMyPortfolios,
  getPublicPortfolio,
  getPublicPortfolios,
  updatePortfolio,
} from "../controllers/PortfolioController.js";

const portfolioRoutes = Router();

portfolioRoutes.get("/", getPublicPortfolios);
portfolioRoutes.delete("/me", isAuthenticated, deleteMyPortfolios);
portfolioRoutes.get("/me", isAuthenticated, getMyPortfolios);
portfolioRoutes.get("/me/:id", isAuthenticated, getMyPortfolio);
portfolioRoutes.get("/:id", getPublicPortfolio);
portfolioRoutes.post("/", isAuthenticated, uploadPortfolioImages, createPortfolio);
portfolioRoutes.post("/create", isAuthenticated, uploadPortfolioImages, createPortfolio);
portfolioRoutes.patch("/:id", isAuthenticated, uploadPortfolioImages, updatePortfolio);
portfolioRoutes.put("/:id", isAuthenticated, uploadPortfolioImages, updatePortfolio);
portfolioRoutes.delete("/:id", isAuthenticated, deletePortfolio);

export default portfolioRoutes;
