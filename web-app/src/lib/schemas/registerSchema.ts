import { z } from "zod";

export const registerSchema = z.object({
  displayName: z.string().min(3, {
    message: "Display name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(["USER","MARKET","ADMIN","MARKETIGNMANAGER"]).default("USER"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;



export const registerForUpdateSchema = z.object({
  displayName: z.string().min(3, {
    message: "Display name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Enter a valid email address.",
  }),
  password: z
  .string()
  .optional(),
  // role: z.enum(["USER","MARKETUSER","ADMIN"]).default("USER"),
});

export type RegisterForUpdateSchema = z.infer<typeof registerForUpdateSchema>;