import mongoose from "mongoose";

const orderStatusHistorySchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Ready for Pickup",
        "Out for Delivery",
        "Completed",
        "Cancelled",
      ],
      required: true,
    },
    changedAt: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    menuItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MenuItem",
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    priceAtOrderTime: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    fulfillmentMethod: {
      type: String,
      enum: ["Delivery", "Pickup"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "GCash", "Cash on Pickup"],
      required: true,
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "Accepted",
        "Preparing",
        "Ready for Pickup",
        "Out for Delivery",
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },
    items: {
      type: [orderItemSchema],
      validate: [(value) => value.length > 0, "At least one order item is required."],
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    statusHistory: {
      type: [orderStatusHistorySchema],
      default: [{ status: "Pending", changedAt: new Date(), note: "Order placed" }],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);
