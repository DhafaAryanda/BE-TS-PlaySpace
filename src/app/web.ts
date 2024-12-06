import express from "express";
import { publicRouter } from "../router/public-api";
import { errorMiddleware } from "../middleware/error-middleware";
import { apiRouter } from "../router/api";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

export const web = express();
web.use(express.json());

// Tambahkan cookie-parser middleware
web.use(cookieParser()); // Ini harus diletakkan sebelum middleware router dan lainnya

// CORS setup
web.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
); // This will allow all origins by default

// Routing
web.use(publicRouter);
web.use(apiRouter);

// Error handling middleware
web.use(errorMiddleware);

// Menambahkan log untuk memastikan server berjalan
const PORT = process.env.PORT || 3000; // Port default 3000 jika tidak ada di .env
web.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
