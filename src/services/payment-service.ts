import { BookingStatus, PaymentStatus, Prisma } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import { Validation } from "../validation/validation";
import { PaymentValidation } from "../validation/payment-validation";
import {
  CreatePaymentRequest,
  PaymentDataResponse,
  toPaymentsResponse,
} from "../model/payment-model";
export class PaymentService {
  static async create(
    request: CreatePaymentRequest,
    userId: string,
    bookingId: string
  ): Promise<PaymentDataResponse> {
    const createRequest = Validation.validate(
      PaymentValidation.CREATE,
      request
    );

    const booking = await prismaClient.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new ResponseError(404, "Booking not found");
    }

    if (booking.userId !== userId) {
      throw new ResponseError(403, "Forbidden");
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new ResponseError(400, "Booking is not pending");
    }

    const paymentData = {
      ...createRequest,
      bookingId: bookingId,
      paymentDate: new Date(),
      status: PaymentStatus.PAID,
    };

    try {
      const payment = await prismaClient.payment.create({
        data: paymentData,
      });

      await prismaClient.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      });

      return toPaymentsResponse(payment);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ResponseError(500, "Database error: " + error.message);
      }
      throw error;
    }
  }

  static async getById(paymentId: string, userId: string) {
    const payment = await prismaClient.payment.findUnique({
      where: {
        id: paymentId,
      },
      include: {
        booking: true,
      },
    });

    if (!userId) {
      throw new ResponseError(401, "Unauthorized: You are not logged in");
    }

    if (payment?.booking.userId !== userId) {
      throw new ResponseError(
        403,
        "Forbidden: You are not the owner of this payment"
      );
    }

    if (!payment) {
      throw new ResponseError(404, "Payment not found");
    }

    return toPaymentsResponse(payment);
  }
}
