import { z, ZodType } from "zod";

export class BenefitValidation {
  static readonly CREATE: ZodType = z.object({
    facilityId: z.string().min(1).max(100),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
  });
}
