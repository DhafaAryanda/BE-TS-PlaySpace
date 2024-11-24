import { Booking, BookingStatus } from "@prisma/client";

export type BookingResponse = {
  id: string;
  user_id: string;
  facility_id: string;
  booking_date: Date;
  start_time: Date;
  end_time: Date;
  total_price: string;
  status: BookingStatus;
};

export type CreateBookingRequest = {
  facility_id: string;
  booking_date: Date;
  start_time: Date;
  end_time: Date;
};

export function toBookingResponse(booking: Booking): BookingResponse {
  return {
    id: booking.id,
    user_id: booking.user_id,
    facility_id: booking.facility_id,
    booking_date: booking.booking_date,
    start_time: booking.start_time,
    end_time: booking.end_time,
    total_price: booking.total_price.toFixed(2),
    status: booking.status,
  };
}
