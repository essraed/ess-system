import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  isUber: z.boolean().default(false) // ✅ new boolean field
});

export type CategorySchema = z.infer<typeof categorySchema>;
