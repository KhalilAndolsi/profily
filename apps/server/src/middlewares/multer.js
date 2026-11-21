import fs from "node:fs";
import path from "node:path";
import multer from "multer";

const uploadDirectory = path.resolve(process.cwd(), "uploads");
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDirectory,
  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    callback(null, uniqueName);
  },
});

const imageUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
    if (["image/jpeg", "image/png", "image/webp"].includes(file.mimetype)) {
      callback(null, true);
      return;
    }

    callback(new Error("Only JPG, PNG, and WebP images are allowed"));
  },
});

export const uploadSingleImage = (fieldName) =>
  imageUpload.single(fieldName);

export const uploadPortfolioImages = imageUpload.fields([
  { name: "photo", maxCount: 1 },
  { name: "projectImages", maxCount: 20 },
]);
