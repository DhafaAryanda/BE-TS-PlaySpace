import { Booking, BookingStatus } from "@prisma/client";

export type BookingResponse = {
  id: string;
  userId: string;
  facilityId: string;
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
  totalPrice: string;
  status: BookingStatus;
};

export type CreateBookingRequest = {
  facilityId: string;
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
};

export function toBookingResponse(booking: Booking): BookingResponse {
  return {
    id: booking.id,
    userId: booking.userId,
    facilityId: booking.facilityId,
    bookingDate: booking.bookingDate,
    startTime: booking.startTime,
    endTime: booking.endTime,
    totalPrice: booking.totalPrice.toFixed(2),
    status: booking.status,
  };
}
