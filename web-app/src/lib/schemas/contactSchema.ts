import { z } from "zod";

const uaePhoneNumberRegex =
  /^(?:\+971\s?5[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}|05[0-9]{1}\s?[0-9]{3}\s?[0-9]{4})$/;

export const contactSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .nonempty("Name is required"),

  phone: z
    .string()
    .regex(
      uaePhoneNumberRegex,
      "Phone number must be a valid UAE mobile number (e.g., +971 50 123 4567 or 050 123 4567)"
    ),

  email: z.union([
    z.string().email("Invalid email address"),
    z.string().max(0),
  ]),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters long")
    .nonempty("Message is required"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
