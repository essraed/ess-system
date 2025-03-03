import { z } from "zod";

// Passport number regex
const passportNumberRegex = /^[A-Za-z]{1,2}[0-9]{6,9}$/;

export const clientSchema = z.object({
  clients: z.array(
    z.object({
      name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(100, "Name must not exceed 100 characters"),
        bookingId: z.string().optional(), 
      passportNumber: z
        .string()
        .regex(passportNumberRegex, "Passport number must be valid (e.g., AB1234567)")
        .min(1, "Passport number is required")
    })
  )
});

export type ClientSchema = z.infer<typeof clientSchema>;
