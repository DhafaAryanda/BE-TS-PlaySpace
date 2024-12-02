import { NextFunction, Request, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreateBookingRequest } from "../model/booking-model";
import { BookingService } from "../services/booking-service";

export class BookingController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const facilityId = req.params.facilityId;

      if (!userId || !facilityId) {
        res.status(401).json({
          message: "Bad request: Missing parameters",
        });
        return;
      }

      const isCustomer = req.user?.role === "CUSTOMER";
      if (!isCustomer) {
        res.status(403).json({
          message: "Forbidden: Only customer can create booking",
        });
        return;
      }

      const request: CreateBookingRequest = {
        ...req.body,
        facilityId: facilityId,
      };
      const response = await BookingService.create(request, userId);

      res.status(201).json({
        message: "Booking created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async cancel(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const bookingId = req.params.bookingId;
      const userId = req.user?.id;
      const userRole = req.user?.role;

      if (!userId || !userRole) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      if (userRole !== "ADMIN" && userRole !== "CUSTOMER") {
        res.status(403).json({
          message: "Forbidden: Only customer or admin can cancel booking",
        });
        return;
      }

      const response = await BookingService.cancel(bookingId, userId, userRole);
      res.status(200).json({
        message: "Booking cancelled successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
