export default function serializeUser(user) {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone || "",
    address: user.address || "",
    role: user.role,
    googleId: user.googleId || null,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
