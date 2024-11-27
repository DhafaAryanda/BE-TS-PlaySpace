import { z, ZodType } from "zod";

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1).max(100),
    phone: z.string().min(1).max(16),
    address: z.string().min(1).max(255).optional(),
    avatar: z.string().min(1).max(255).optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    password: z.string().min(8).optional(),
    phone: z.string().min(1).max(16).optional(),
    address: z.string().min(1).max(255).optional(),
  });
}
