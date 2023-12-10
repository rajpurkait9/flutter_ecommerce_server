import express, { Application } from "express";
import { config } from "dotenv";

config();
// application
const app: Application = express();

const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());

// routes
import userRoutes from "./routes/user.routes";
import ConnectDB from "./DBs/mongoConnect";
app.use("/api/user", userRoutes);

async function main() {
  try {
    ConnectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is running ${port}`);
    });
  } catch (error: any) {
    const message = error.message || "Internal server error";
    const statusCode = error.statusCode || 500;
    console.log(`Error: ${message} - Status code: ${statusCode}`);
    process.exit(1);
  }
}

// run application
main();
