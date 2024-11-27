import express from "express";
import { UserController } from "../controller/user-controller";
import { FacilityController } from "../controller/facility-controller";
import { CategoryController } from "../controller/category-controller";

const publicRouter = express.Router();

// Users
publicRouter.post("/api/users", UserController.register); // Create New User

// Auth
publicRouter.post("/api/auth/login", UserController.login); // Login User

publicRouter.get("/api/facilities", FacilityController.getAll); // Get All Facilities

publicRouter.get("/api/categories", CategoryController.getAll);
export { publicRouter };
