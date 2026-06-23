import { Router } from "express";
import MenuItem from "../models/MenuItem.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/",
  asyncHandler(async (request, response) => {
    const menuItems = await MenuItem.find().sort({ category: 1, type: 1, code: 1 });
    response.json(menuItems);
  })
);

router.get(
  "/:code",
  asyncHandler(async (request, response) => {
    const menuItem = await MenuItem.findOne({ code: request.params.code.toUpperCase() });
    if (!menuItem) {
      return response.status(404).json({ message: "Menu item not found." });
    }

    return response.json(menuItem);
  })
);

export default router;
