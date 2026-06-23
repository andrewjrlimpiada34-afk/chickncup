import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/appError.js";

export async function requireAuth(request, response, next) {
  const authorizationHeader = request.headers.authorization || "";
  const token = authorizationHeader.startsWith("Bearer ")
    ? authorizationHeader.slice(7)
    : null;

  if (!token) {
    return next(new AppError("Authentication required.", 401));
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);

    if (!user) {
      return next(new AppError("User not found.", 401));
    }

    request.user = user;
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired token.", 401));
  }
}

export function requireAdmin(request, response, next) {
  if (!request.user || request.user.role !== "admin") {
    return next(new AppError("Admin access required.", 403));
  }

  return next();
}
