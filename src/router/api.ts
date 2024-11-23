import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";

const apiRouter = express.Router();

// Endpoint untuk mendapatkan profil pengguna (perlu otentikasi)
apiRouter.get("/api/users/profile", authMiddleware, UserController.get);
apiRouter.put("/api/users/update", authMiddleware, UserController.update);
// Endpoint untuk memperbarui data pengguna (perlu otentikasi)
// apiRouter.put("/profile", authMiddleware, UserController.updateProfile);

export { apiRouter };
