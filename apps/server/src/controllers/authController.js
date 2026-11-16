import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import { generateToken } from "../utils/jwt.js";

const tokenMaxAge = 7 * 24 * 60 * 60 * 1000;

const formatValidationErrors = (error) =>
  error.details.map(({ message, path }) => ({
    field: path.join("."),
    message,
  }));

export const signup = async (req, res, next) => {
  try {
    const {
      nickname = "",
      email = "",
      password = "",
      confirmPassword = "",
    } = req.body;
    const { error, value } = UserModel.validateSignupInput({
      nickname,
      email,
      password,
      confirmPassword,
    });
    if (error) {
      return res.status(400).json({
        message: "Invalid signup data",
        errors: formatValidationErrors(error),
      });
    }

    const existingUser = await UserModel.exists({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered" });
    }
    const user = await UserModel.create({
      nickname: value.nickname,
      email: value.email,
      password: value.password,
    });
    const avatar = `https://api.dicebear.com/10.x/lorelei/svg?seed=${user.id}`;
    user.avatar = avatar;
    await user.save();
    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: tokenMaxAge,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(201).json({
      message: "Signup successful",
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        role: user.role,
        token,
      },
    });
  } catch (requestError) {
    if (requestError?.code === 11000) {
      return res.status(409).json({ message: "Email is already registered" });
    }

    return next(requestError);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email = "", password = "" } = req.body;
    const { error, value } = UserModel.validateLoginInput({ email, password });
    if (error) {
      return res.status(400).json({
        message: "Invalid login data",
        errors: formatValidationErrors(error),
      });
    }

    const user = await UserModel.findOne({ email: value.email }).select(
      "+password",
    );
    if (!user || !(await bcrypt.compare(value.password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user.id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: tokenMaxAge,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        nickname: user.nickname,
        email: user.email,
        avatar: user.avatar,
        createdAt: user.createdAt,
        role: user.role,
        token,
      },
    });
  } catch (requestError) {
    return next(requestError);
  }
};
