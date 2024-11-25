import { z, ZodType } from "zod";

export class PaymentValidation {
  static readonly CREATE: ZodType = z.object({
    payment_method: z.enum(["BANK_TRANSFER", "E_WALLET"]),
    payment_amount: z.number().min(1),
  });
}
