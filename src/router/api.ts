import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { FacilityController } from "../controller/facility-controller";

const apiRouter = express.Router();

// USERS
apiRouter.get("/api/users/profile", authMiddleware, UserController.get);
apiRouter.put("/api/users/update", authMiddleware, UserController.update);
apiRouter.delete("/api/users/logout", authMiddleware, UserController.logout);

// FACILITIES
apiRouter.get(
  "/api/facilities/:facilityId",
  authMiddleware,
  FacilityController.get
);
apiRouter.post(
  "/api/facilities/create",
  authMiddleware,
  FacilityController.create
);
apiRouter.put(
  "/api/facilities/update/:facilityId",
  authMiddleware,
  FacilityController.update
);

export { apiRouter };
