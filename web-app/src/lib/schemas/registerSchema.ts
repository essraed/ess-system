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
//   role: z.string().nonempty({ message: "Role is required." }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
