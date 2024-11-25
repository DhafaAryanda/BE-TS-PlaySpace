import { Payment, PaymentMethod, PaymentStatus } from "@prisma/client";

export type PaymentDataResponse = {
  id: string;
  booking_id: string;
  payment_method: PaymentMethod;
  payment_amount: string;
  payment_date: Date;
  status: PaymentStatus;
};

export type CreatePaymentRequest = {
  // booking_id: string;
  payment_method: PaymentMethod;
  payment_amount: string;
};

export function toPaymentsResponse(payment: Payment): PaymentDataResponse {
  return {
    id: payment.id,
    booking_id: payment.booking_id,
    payment_method: payment.payment_method,
    payment_amount: payment.payment_amount.toFixed(2),
    payment_date: payment.payment_date,
    status: payment.status,
  };
}
