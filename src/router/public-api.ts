import express from "express";
import { UserController } from "../controller/user-controller";

const publicRouter = express.Router();

// Users
publicRouter.post("/api/users", UserController.register); // Create New User

// Auth
publicRouter.post("/api/auth/login", UserController.login); // Login User

export { publicRouter };
