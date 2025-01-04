import { z } from "zod";

const uaePhoneNumberRegex =
  /^(?:\+971\s?5[0-9]{1}\s?[0-9]{3}\s?[0-9]{4}|05[0-9]{1}\s?[0-9]{3}\s?[0-9]{4})$/;

export const lostSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must not exceed 50 characters"),

  phone: z
    .string()
    .regex(
      uaePhoneNumberRegex,
      "Phone number must be a valid UAE mobile number (e.g., +971 50 123 4567 or 050 123 4567)"
    )
    .min(1, "Phone number is required"),

  email: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),

  lostDepartment: z.enum(
    [
      "Medical DHA - AREA 6",
      "Medical DHA - AREA 7",
      "Medical DHA - AREA 6 XRAY",
      "Medical DHA - AREA 7 XRAY",
      "Medical OHC - AREA 4",
      "AMER - ZONE A",
      "TAWJEEH - ZONE B",
      "TYPING - ZONE C",
      "MAIN RECEPTION",
      "OTHER AREA",
    ],
    { errorMap: () => ({ message: "Invalid department selected" }) }
  ),

  comments: z
    .string()
    .min(1, "Comments are required")
    .min(10, "Comments must be at least 10 characters long")
    .max(500, "Comments must not exceed 500 characters"),

    lostDate: z
    .string()
    .refine((date) => new Date(date) <= new Date(), {
      message: "Lost date cannot be in the future",
    })
    .optional(),
});

export type LostSchema = z.infer<typeof lostSchema>;
