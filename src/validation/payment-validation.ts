import { z, ZodType } from "zod";

export class PaymentValidation {
  static readonly CREATE: ZodType = z.object({
    paymentMethod: z.enum(["BANK_TRANSFER", "E_WALLET"]),
    paymentAmount: z.number().min(1),
  });
}
