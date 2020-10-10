import express from "express";
import dotenv from "dotenv";
import connect_db from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { not_found, error_handler } from "./middleware/errorMiddleware.js";

dotenv.config();

connect_db();

const app = express();

app.use("/api/products", productRoutes);

app.use(not_found);

app.use(error_handler);

const port = process.env.PORT || 5000;

app.listen(
  port,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
