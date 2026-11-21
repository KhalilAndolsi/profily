import { Router } from "express";
import {
  createCv,
  deleteCv,
  deleteMyCvs,
  getAllCvs,
  getMyCv,
  getMyCvs,
  getPublicCv,
  updateCv,
} from "../controllers/CvController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/multer.js";

const cvRoutes = Router();

cvRoutes.get("/", getAllCvs);
cvRoutes.delete("/me", isAuthenticated, deleteMyCvs);
cvRoutes.get("/me", isAuthenticated, getMyCvs);
cvRoutes.get("/me/:id", isAuthenticated, getMyCv);
cvRoutes.get("/:id", getPublicCv);
cvRoutes.post("/", isAuthenticated, uploadSingleImage("photo"), createCv);
cvRoutes.post("/create", isAuthenticated, uploadSingleImage("photo"), createCv);
cvRoutes.patch("/:id", isAuthenticated, uploadSingleImage("photo"), updateCv);
cvRoutes.put("/:id", isAuthenticated, uploadSingleImage("photo"), updateCv);
cvRoutes.delete("/:id", isAuthenticated, deleteCv);

export default cvRoutes;
