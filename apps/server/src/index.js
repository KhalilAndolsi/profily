import express from "express";
import path from "node:path";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import connectToDatabase from "./config/connexion.js";
import authRoutes from "./routes/authRoutes.js";
import cvRoutes from "./routes/CvRouter.js";
import portfolioRoutes from "./routes/PortfolioRouter.js";
import linkPageRoutes from "./routes/LinkPageRouter.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();
const port = 3000;

connectToDatabase()

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/link-page", linkPageRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
