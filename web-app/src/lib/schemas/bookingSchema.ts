import { z } from 'zod';


export const bookingSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"), 
  phone: z.string().min(7, "Phone number must be at least 7 characters"),
  email: z.string().email("Invalid email format"), 
  address: z.string().optional(),
  latitude: z.number().optional(), 
  longitude: z.number().optional(), 
  bookingDate: z.date().optional(), 
  endBookingDate: z.date().optional(), 
  serviceId: z.string().uuid("Invalid service ID format").optional(),
  isVIP: z.boolean().default(false),
});


export type BookingSchema = z.infer<typeof bookingSchema>;
