import { message } from "antd";
import { z } from "zod";

export const testimonialSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Description is required"),
});

export type TestimonialSchema = z.infer<typeof testimonialSchema>;
