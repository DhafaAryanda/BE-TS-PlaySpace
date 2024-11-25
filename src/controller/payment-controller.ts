import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { CreatePaymentRequest } from "../model/payment-model";
import { PaymentService } from "../services/payment-service";

export class PaymentController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: CreatePaymentRequest = req.body as CreatePaymentRequest;
      const userId = req.user?.id;
      const bookingId = req.params.bookingId;
      if (!userId) {
        res.status(401).json({
          message: "Unauthorized",
        });
        return;
      }

      const response = await PaymentService.create(request, userId, bookingId);
      res.status(201).json({
        message: "Payment created successfully",
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const paymentId = req.params.paymentId;
      const userId = req.user!.id;

      const response = await PaymentService.getById(paymentId, userId);
      res.status(200).json({
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
