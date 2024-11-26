import { z } from 'zod';
import { serviceSchema } from './serviceSchema';

const paymentStatusSchema = z.enum(['PENDING', 'PAID', 'FAILED']).default('PENDING');
const paymentMethodSchema = z.enum(['CREDIT_CARD', 'CASH', 'BANK_TRANSFER']).optional();
const timestampSchema = z.date().optional();

export const orderSchema = z.object({
  customerName: z.string().min(1),
  phone: z.string().min(7),
  email: z.string().email(),
  service: serviceSchema,
  quantity: z.number().positive(),
  totalPrice: z.number().nonnegative(),
  paymentStatus: paymentStatusSchema,
  paymentMethod: paymentMethodSchema,
  purchasedAt: timestampSchema,
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
});

export type OrderSchema = z.infer<typeof orderSchema>;
