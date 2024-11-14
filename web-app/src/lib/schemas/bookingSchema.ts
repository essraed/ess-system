import { z } from "zod";

const timeFormat = /^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/;

export const bookingSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  phone: z.string().min(7, "Phone number must be at least 7 characters"),
  email: z.string().email("Invalid email format"),
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  bookingDate: z.string().optional(), 
  bookingTime: z.string().regex(timeFormat, "Invalid time format, expected 'HH:mm AM/PM'"),
  serviceId: z.string().uuid("Invalid service ID format").optional(),
  isVIP: z.boolean().default(false),
  serviceOptionId: z.string().optional(),
  totalPrice: z.number().nullable().optional(),
});


export type BookingSchema = z.infer<typeof bookingSchema>;
