import {z} from 'zod';

export const eventSchema = z.object({
    employeename: z.string().min(3),
    employeecode:z.string().min(1),
    department: z.enum(
      [
        "AMER RECEPTION",
        "AMER TYPING",
        "TASHEEL",
        "DED",
        "DUBAI COURT",
        "IT",
        "MARKETING",
        "HR",
        "DHA",
        "ACCOUNTS",
        "CASHIER",
        "TYPING",
        "MAINTAINACE",
        "CLEANING",
        "CUSTOMER SERVICES",
        "OTHER",
      ],
      { errorMap: () => ({ message: "Invalid department selected" }) }
    ),

    isComing: z
    .union([z.literal("true"), z.literal("false")])  // Accepts string "true" or "false"
    .transform((val) => val === "true"),// This should be a boolean

})

export type EventSchema = z.infer<typeof eventSchema>

