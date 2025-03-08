import {z} from 'zod';

export const eventPROSchema = z.object({
    proname: z.string().min(3),
    email: z.string().email("Invalid email format"),
    isComing: z
    .union([z.literal("true"), z.literal("false")])  // Accepts string "true" or "false"
    .transform((val) => val === "true"),// This should be a boolean
})

export type EventPROSchema = z.infer<typeof eventPROSchema>