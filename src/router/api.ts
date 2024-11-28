import express from "express";
import { UserController } from "../controller/user-controller";
import { authMiddleware } from "../middleware/auth-middleware";
import { FacilityController } from "../controller/facility-controller";
import { BookingController } from "../controller/booking-controller";
import { PaymentController } from "../controller/payment-controller";
import { CategoryController } from "../controller/category-controller";

const apiRouter = express.Router();

// USERS
apiRouter.get("/api/users/profile", authMiddleware, UserController.get);
apiRouter.put("/api/users/update", authMiddleware, UserController.update);
apiRouter.delete("/api/users/logout", authMiddleware, UserController.logout);

// FACILITIES

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

// BOOKINGS
apiRouter.post(
  "/api/facilities/:facilityId/bookings",
  authMiddleware,
  BookingController.create
);
apiRouter.patch(
  "/api/facilities/bookings/:bookingId/cancel",
  authMiddleware,
  BookingController.cancel
);

// PAYMENTS
apiRouter.post(
  "/api/payments/:bookingId",
  authMiddleware,
  PaymentController.create
);
apiRouter.get(
  "/api/payments/:paymentId",
  authMiddleware,
  PaymentController.getById
);

// CATEGORIES
apiRouter.post("/api/categories", authMiddleware, CategoryController.create);
apiRouter.patch(
  "/api/categories/:categoryId",
  authMiddleware,
  CategoryController.update
);
export { apiRouter };
