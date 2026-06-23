import { Router } from "express";
import MenuItem from "../models/MenuItem.js";
import { requireAdmin, requireAuth } from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.post(
  "/",
  asyncHandler(async (request, response) => {
    const createdItem = await MenuItem.create(request.body);
    response.status(201).json(createdItem);
  })
);

router.patch(
  "/:id",
  asyncHandler(async (request, response) => {
    const updatedItem = await MenuItem.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return response.status(404).json({ message: "Menu item not found." });
    }

    return response.json(updatedItem);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (request, response) => {
    const deletedItem = await MenuItem.findByIdAndDelete(request.params.id);
    if (!deletedItem) {
      return response.status(404).json({ message: "Menu item not found." });
    }

    return response.status(204).send();
  })
);

export default router;
