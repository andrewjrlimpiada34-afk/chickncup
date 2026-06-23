import { Router } from "express";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/appError.js";
import generateOrderNumber from "../utils/orderNumber.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  asyncHandler(async (request, response) => {
    const query = request.user.role === "admin" ? {} : { user: request.user._id };
    const orders = await Order.find(query).sort({ createdAt: -1 });
    response.json(orders);
  })
);

router.post(
  "/",
  requireAuth,
  asyncHandler(async (request, response) => {
    const {
      customerName,
      contactNumber,
      address = "",
      fulfillmentMethod,
      paymentMethod,
      notes = "",
      items = [],
      deliveryFee = 0,
    } = request.body;

    if (!items.length) {
      throw new AppError("At least one cart item is required.", 400);
    }

    const menuIds = items.map((item) => item.id).filter(Boolean);
    const menuItems = await MenuItem.find({ _id: { $in: menuIds } });

    if (menuItems.length !== menuIds.length) {
      throw new AppError("One or more menu items no longer exist.", 400);
    }

    const menuById = new Map(menuItems.map((item) => [item._id.toString(), item]));
    const normalizedItems = items.map((item) => {
      const menuItem = menuById.get(item.id);

      if (!menuItem.available) {
        throw new AppError(`${menuItem.name} is currently sold out.`, 400);
      }

      return {
        menuItemId: menuItem._id,
        code: menuItem.code,
        name: menuItem.name,
        imageUrl: menuItem.imageUrl,
        priceAtOrderTime: menuItem.price,
        quantity: item.quantity,
      };
    });

    const subtotal = normalizedItems.reduce(
      (total, item) => total + item.priceAtOrderTime * item.quantity,
      0
    );
    const total = subtotal + Number(deliveryFee || 0);

    const order = await Order.create({
      orderNumber: generateOrderNumber(),
      user: request.user._id,
      customerName,
      contactNumber,
      address,
      fulfillmentMethod,
      paymentMethod,
      notes,
      items: normalizedItems,
      subtotal,
      deliveryFee,
      total,
      statusHistory: [
        {
          status: "Pending",
          changedAt: new Date(),
          note: "Order placed",
        },
      ],
    });

    response.status(201).json(order);
  })
);

export default router;
