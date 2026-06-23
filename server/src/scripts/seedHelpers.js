import bcrypt from "bcryptjs";
import MenuItem from "../models/MenuItem.js";
import User from "../models/User.js";
import { seedMenuItems } from "../data/seedMenuItems.js";

export async function seedInitialDataIfNeeded() {
  const menuCount = await MenuItem.countDocuments();
  if (menuCount === 0) {
    await MenuItem.insertMany(seedMenuItems);
  }

  const adminEmail = String(process.env.ADMIN_EMAIL || "admin@chickncup.com").toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
    await User.create({
      name: process.env.ADMIN_NAME || "Chick N' Cup Admin",
      email: adminEmail,
      passwordHash,
      phone: process.env.ADMIN_PHONE || "09605763695",
      address: "Chick N' Cup Main Branch",
      role: "admin",
    });
  }
}
