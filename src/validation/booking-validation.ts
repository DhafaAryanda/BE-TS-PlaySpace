import { z, ZodType } from "zod";

export class BookingValidation {
  static readonly CREATE: ZodType = z.object({
    facility_id: z.string().min(1).max(100),
    booking_date: z.string().min(1).max(100),
    start_time: z.string().min(1).max(100),
    end_time: z.string().min(1).max(100),
  });
}
