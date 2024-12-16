import { z } from "zod";

const uaePhoneNumberRegex =
  /^(?:\+971\s?5[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}|05[0-9]{1}\s?[0-9]{3}\s?[0-9]{4})$/;

export const businessSchema = z.object({
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
  licenseType: z
    .enum(["Professional", "Commerical", "Industrial"])
    .optional()
    .refine((val) => val !== undefined, {
      message: "License type is required",
    }),

  ejari: z.boolean().optional(),

  localAgent: z.boolean().optional(),

  EnquiryType: z.boolean().optional(),
});

export type BusinessSchema = z.infer<typeof businessSchema>;
