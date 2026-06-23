import { config } from "dotenv";
import connectDatabase from "../config/db.js";
import { seedInitialDataIfNeeded } from "./seedHelpers.js";

config();

async function runSeed() {
  await connectDatabase(process.env.MONGODB_URI);
  await seedInitialDataIfNeeded();
  console.log("Seed complete");
  process.exit(0);
}

runSeed().catch((error) => {
  console.error("Seed failed", error);
  process.exit(1);
});
