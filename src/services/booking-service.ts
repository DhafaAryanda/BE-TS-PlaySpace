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

    if (request.startTime >= request.endTime) {
      throw new ResponseError(400, "Start time must be earlier than end time");
    }

    // Validasi konflik waktu
    const existingBooking = await prismaClient.booking.findFirst({
      where: {
        facilityId: createRequest.facilityId,
        AND: [
          { startTime: { lt: request.endTime } },
          { endTime: { gt: request.startTime } },
        ],
      },
    });

    if (existingBooking) {
      throw new ResponseError(400, "Facility is already booked");
    }

    const facility = await prismaClient.facility.findUnique({
      where: {
        id: createRequest.facilityId,
      },
    });

    if (!facility) {
      throw new ResponseError(404, "Facility not found");
    }

    const startTime = new Date(request.startTime);
    const endTime = new Date(request.endTime);

    const durationHours =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

    const totalPrice = durationHours * facility.pricePerHour.toNumber();

    const bookingData = {
      ...createRequest,
      userId: userId,
      totalPrice: totalPrice,
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

    if (
      booking.status !== BookingStatus.PENDING &&
      booking.status !== BookingStatus.CONFIRMED
    ) {
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
        updatedAt: new Date(),
      },
    });

    return toBookingResponse(updatedBooking);
  }
}
