import express from "express";
import { UserController } from "../controller/user-controller";
import { FacilityController } from "../controller/facility-controller";
import { CategoryController } from "../controller/category-controller";
import { BenefitController } from "../controller/benefit-controller";

const publicRouter = express.Router();

// Users
publicRouter.post("/api/users", UserController.register); // Create New User

// Auth
publicRouter.post("/api/auth/login", UserController.login); // Login User

publicRouter.get("/api/facilities", FacilityController.getAll); // Get All Facilities

publicRouter.get("/api/categories", CategoryController.getAll);

publicRouter.get("/api/facilities/:facilityId", FacilityController.get);

// Benefits
publicRouter.get("/api/facilities/:facilityId/benefits", BenefitController.get);

// apiRouter.get(
//   "/api/facilities/:facilityId",
//   authMiddleware,
//   FacilityController.get
// );
export { publicRouter };
