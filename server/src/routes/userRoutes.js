import { Router } from "express";
import User from "../models/User.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import serializeUser from "../utils/serializeUser.js";

const router = Router();

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (request, response) => {
    response.json({ user: serializeUser(request.user) });
  })
);

router.patch(
  "/me",
  requireAuth,
  asyncHandler(async (request, response) => {
    const { name, phone, address } = request.body;
    const user = await User.findByIdAndUpdate(
      request.user._id,
      { name, phone, address },
      { new: true, runValidators: true }
    );

    response.json({ user: serializeUser(user) });
  })
);

export default router;
