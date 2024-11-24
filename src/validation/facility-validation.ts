import { z, ZodType } from "zod";

export class FacilityValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    category: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    price_per_hour: z.string().min(1).max(100),
    owner_id: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    category: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
    price_per_hour: z.string().min(1).max(100).optional(),
  });
}
