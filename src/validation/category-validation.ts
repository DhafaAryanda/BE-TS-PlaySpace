import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(100),
    icon: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(100).optional(),
    icon: z.string().min(1).max(100).optional(),
  });
}
