import express from "express";
import { UserController } from "../controller/user-controller";
import { FacilityController } from "../controller/facility-controller";

const publicRouter = express.Router();

// Users
publicRouter.post("/api/users", UserController.register); // Create New User

// Auth
publicRouter.post("/api/auth/login", UserController.login); // Login User

// Facilities
publicRouter.get(
  "/api/facilities/categories",
  FacilityController.getCategories
);

publicRouter.get("/api/facilities", FacilityController.getAll); // Get All Facilities

export { publicRouter };
