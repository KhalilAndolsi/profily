import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/multer.js";
import {
  createLinkPage,
  deleteLinkPage,
  deleteMyLinkPages,
  getMyLinkPage,
  getMyLinkPages,
  getPublicLinkPage,
  getPublicLinkPages,
  updateLinkPage,
} from "../controllers/LinkPageController.js";

const linkPageRoutes = Router();

linkPageRoutes.get("/", getPublicLinkPages);
linkPageRoutes.delete("/me", isAuthenticated, deleteMyLinkPages);
linkPageRoutes.get("/me", isAuthenticated, getMyLinkPages);
linkPageRoutes.get("/me/:id", isAuthenticated, getMyLinkPage);
linkPageRoutes.get("/:username", getPublicLinkPage);
linkPageRoutes.post("/", isAuthenticated, uploadSingleImage("photo"), createLinkPage);
linkPageRoutes.post("/create", isAuthenticated, uploadSingleImage("photo"), createLinkPage);
linkPageRoutes.patch("/:id", isAuthenticated, uploadSingleImage("photo"), updateLinkPage);
linkPageRoutes.put("/:id", isAuthenticated, uploadSingleImage("photo"), updateLinkPage);
linkPageRoutes.delete("/:id", isAuthenticated, deleteLinkPage);

export default linkPageRoutes;
