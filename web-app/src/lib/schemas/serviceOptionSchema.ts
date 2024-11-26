

import { z } from 'zod';

export const serviceOptionSchema = z.object({
  name: z.string().min(1, "Name is required"), // Ensures name is a non-empty string
  description: z.string().optional(), // Optional description
  additionalFee: z.number().nonnegative("Additional fee must be a non-negative number"), // Validates a non-negative number
});

export type ServiceOptionSchema = z.infer<typeof serviceOptionSchema>;