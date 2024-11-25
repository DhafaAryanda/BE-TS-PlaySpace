import { BookingStatus, Prisma } from "@prisma/client";
import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
  BookingResponse,
  CreateBookingRequest,
  toBookingResponse,
} from "../model/booking-model";
import { BookingValidation } from "../validation/booking-validation";
import { Validation } from "../validation/validation";

export class BookingService {
  static async create(
    request: CreateBookingRequest,
    userId: string
  ): Promise<BookingResponse> {
    const createRequest = Validation.validate(
      BookingValidation.CREATE,
      request
    );

    if (request.start_time >= request.end_time) {
      throw new ResponseError(400, "Start time must be earlier than end time");
    }

    // Validasi konflik waktu
    const existingBooking = await prismaClient.booking.findFirst({
      where: {
        facility_id: createRequest.facility_id,
        AND: [
          { start_time: { lt: request.end_time } },
          { end_time: { gt: request.start_time } },
        ],
      },
    });

    if (existingBooking) {
      throw new ResponseError(400, "Facility is already booked");
    }

    const facility = await prismaClient.facility.findUnique({
      where: {
        id: createRequest.facility_id,
      },
    });

    if (!facility) {
      throw new ResponseError(404, "Facility not found");
    }

    const startTime = new Date(request.start_time);
    const endTime = new Date(request.end_time);

    const durationHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    const totalPrice = durationHours * facility.price_per_hour.toNumber();

    const bookingData = {
      ...createRequest,
      user_id: userId,
      total_price: totalPrice,
      status: BookingStatus.PENDING,
    };

    try {
      const booking = await prismaClient.booking.create({
        data: bookingData,
      });

      return toBookingResponse(booking);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ResponseError(500, "Database error: " + error.message);
      }
      throw error;
    }
  }

  static async cancel(
    bookingId: string,
    userId: string,
    userRole: string
  ): Promise<BookingResponse> {
    const booking = await prismaClient.booking.findUnique({
      where: {
        id: bookingId,
      },
    });

    if (!booking) {
      throw new ResponseError(404, "Booking not found");
    }

    if (booking.user_id !== userId && userRole !== "ADMIN") {
      throw new ResponseError(
        403,
        "You are not authorized to cancel this booking"
      );
    }

    if (booking.status !== BookingStatus.PENDING || BookingStatus.CONFIRMED) {
      throw new ResponseError(
        400,
        "Only pending or confirmed booking can be cancelled"
      );
    }

    const updatedBooking = await prismaClient.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: BookingStatus.CANCELLED,
        updated_at: new Date(),
      },
    });

    return toBookingResponse(updatedBooking);
  }
}
