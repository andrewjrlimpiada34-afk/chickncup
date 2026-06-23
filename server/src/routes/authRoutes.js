import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import generateToken from "../utils/generateToken.js";
import serializeUser from "../utils/serializeUser.js";

const router = Router();

router.post(
  "/register",
  asyncHandler(async (request, response) => {
    const { name, email, password, phone = "", address = "" } = request.body;

    if (!name || !email || !password) {
      throw new AppError("Name, email, and password are required.", 400);
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new AppError("An account with that email already exists.", 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone,
      address,
      role: "customer",
    });

    response.status(201).json({
      token: generateToken(user),
      user: serializeUser(user),
    });
  })
);

router.post(
  "/login",
  asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email: String(email || "").toLowerCase() });

    if (!user) {
      throw new AppError("Invalid email or password.", 401);
    }

    const isMatch = await bcrypt.compare(String(password || ""), user.passwordHash);
    if (!isMatch) {
      throw new AppError("Invalid email or password.", 401);
    }

    response.json({
      token: generateToken(user),
      user: serializeUser(user),
    });
  })
);

router.post(
  "/google",
  asyncHandler(async (request, response) => {
    const { mode = "login" } = request.query;
    const email = "google.user@chickncup.demo";

    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash("oauth-only", 10);
      user = await User.create({
        name: "Google Guest",
        email,
        passwordHash,
        phone: "",
        address: "",
        role: "customer",
        googleId: "demo-google-id",
      });
    }

    response.status(mode === "register" ? 201 : 200).json({
      token: generateToken(user),
      user: serializeUser(user),
    });
  })
);

export default router;
