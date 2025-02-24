import { z } from "zod";
import { serviceOptionSchema } from "./serviceOptionSchema";

export const serviceSchema = z.object({
  name: z.string().min(3, "Name is required"),
  description: z.string().min(3, "Description is required"),
  price: z.number().nonnegative("Price must be a non-negative number"), 
  priceVIP: z.number().nonnegative("VIP Price must be a non-negative number").default(0).nullable().optional(),
  rate: z.number().optional(),
  serviceVipName: z.string().optional(),
  serviceOptions: z.array(serviceOptionSchema).optional(),
  isRequiredFiles: z.boolean().optional(),
  requiredFiles: z.array(z.string()).optional(),  // Added to handle file choices
  childPrice: z.number().nonnegative("Price must be a non-negative number").optional(),
  expressPrice: z.number().nonnegative("Price must be a non-negative number").optional(),
  regularPrice: z.number().nonnegative("Price must be a non-negative number").optional(),
  
});

export type ServiceSchema = z.infer<typeof serviceSchema>;

