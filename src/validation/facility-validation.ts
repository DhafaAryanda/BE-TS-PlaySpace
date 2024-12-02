import { z, ZodType } from "zod";

export class FacilityValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    categoryId: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    thumbnail: z.string().min(1).max(255),
    pricePerHour: z.number().min(0),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
    thumbnail: z.string().min(1).max(255),
    pricePerHour: z.number().min(0).optional(),
    categoryId: z.string().min(1).max(100).optional(),
  });
}
