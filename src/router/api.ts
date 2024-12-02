import express from "express";
import { UserController } from "../controller/user-controller";
import { FacilityController } from "../controller/facility-controller";
import { authenticateToken } from "../middleware/auth-middleware";
import { CategoryController } from "../controller/category-controller";
import { BenefitController } from "../controller/benefit-controller";
import { BookingController } from "../controller/booking-controller";
import { PaymentController } from "../controller/payment-controller";

const apiRouter = express.Router();

// USERS
apiRouter.get("/api/users", authenticateToken, UserController.get);
apiRouter.put("/api/users/update", authenticateToken, UserController.update);
apiRouter.delete("/api/users/logout", authenticateToken, UserController.logout);

// CATEGORIES
apiRouter.post("/api/categories", authenticateToken, CategoryController.create);
apiRouter.patch(
  "/api/categories/:categoryId",
  authenticateToken,
  CategoryController.update
);

// FACILITIES

apiRouter.post(
  "/api/facilities/create",
  authenticateToken,
  FacilityController.create
);

// apiRouter.patch(
//   "/api/facilities/:facilityId",
//   authenticateToken,
//   FacilityController.update
// );

// BENEFITS
apiRouter.post(
  "/api/facilities/benefits",
  authenticateToken,
  BenefitController.create
);

// BOOKINGS
apiRouter.post(
  "/api/facilities/:facilityId/bookings",
  authenticateToken,
  BookingController.create
);
apiRouter.patch(
  "/api/facilities/bookings/:bookingId/cancel",
  authenticateToken,
  BookingController.cancel
);

// // PAYMENTS
apiRouter.post(
  "/api/payments/:bookingId",
  authenticateToken,
  PaymentController.create
);
apiRouter.get(
  "/api/payments/:paymentId",
  authenticateToken,
  PaymentController.getById
);

export { apiRouter };
