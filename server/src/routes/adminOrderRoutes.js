import { Router } from "express";
import Order from "../models/Order.js";
import { requireAdmin, requireAuth } from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";

const router = Router();

router.use(requireAuth, requireAdmin);

router.get(
  "/",
  asyncHandler(async (request, response) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    response.json(orders);
  })
);

router.patch(
  "/:id/status",
  asyncHandler(async (request, response) => {
    const { status, note = "" } = request.body;
    if (!status) {
      throw new AppError("Status is required.", 400);
    }

    const order = await Order.findById(request.params.id);
    if (!order) {
      return response.status(404).json({ message: "Order not found." });
    }

    order.status = status;
    order.statusHistory.push({
      status,
      changedAt: new Date(),
      note,
    });
    await order.save();

    return response.json(order);
  })
);

export default router;
