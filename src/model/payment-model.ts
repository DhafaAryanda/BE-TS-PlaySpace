import { Payment, PaymentMethod, PaymentStatus } from "@prisma/client";

export type PaymentDataResponse = {
  id: string;
  bookingId: string;
  paymentMethod: PaymentMethod;
  paymentAmount: string;
  paymentDate: Date;
  status: PaymentStatus;
};

export type CreatePaymentRequest = {
  // bookingId: string;
  paymentMethod: PaymentMethod;
  paymentAmount: string;
};

export function toPaymentsResponse(payment: Payment): PaymentDataResponse {
  return {
    id: payment.id,
    bookingId: payment.bookingId,
    paymentMethod: payment.paymentMethod,
    paymentAmount: payment.paymentAmount.toFixed(2),
    paymentDate: payment.paymentDate,
    status: payment.status,
  };
}
