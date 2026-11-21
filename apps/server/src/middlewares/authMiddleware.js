import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

export const isAuthenticated = (req, res, next) => {
  const authorization = req.get("authorization");
  const bearerToken =
    authorization?.startsWith("Bearer ") ? authorization.slice(7) : null;
  const token = req.cookies?.token || bearerToken;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, secret);
    req.userId = decoded.userId;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.userId).select("role");
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    return next();
  } catch {
    return res.status(403).json({ message: "Admin access required" });
  }
};
