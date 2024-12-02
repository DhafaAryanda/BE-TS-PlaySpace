import { z, ZodType } from "zod";

export class BookingValidation {
  static readonly CREATE: ZodType = z.object({
    facilityId: z.string().min(1).max(100),
    bookingDate: z.string().min(1).max(100),
    startTime: z.string().min(1).max(100),
    endTime: z.string().min(1).max(100),
  });
}
