import { config } from "dotenv";
import app from "./app.js";
import connectDatabase from "./config/db.js";
import { seedInitialDataIfNeeded } from "./scripts/seedHelpers.js";

config();

const port = Number(process.env.PORT || 5000);

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI);

  if (process.env.SEED_ON_START === "true") {
    await seedInitialDataIfNeeded();
  }

  app.listen(port, () => {
    console.log(`Chick N' Cup server listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
