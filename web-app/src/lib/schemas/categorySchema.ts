import { z } from "zod";


export const categorySchema = z.object({
    name: z.string().min(1, "Name is required"), // Validates name as a non-empty string
    pictureUrl: z.string().url("Invalid URL format").optional(), // Optional picture URL with URL format validation
  });
  
  export type CategorySchema = z.infer<typeof categorySchema>;
  