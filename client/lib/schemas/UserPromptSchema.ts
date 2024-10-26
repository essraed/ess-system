import { z } from 'zod';

const emiratesIdRegex = /^\d{15}$/;

export const userPromptSchema = z.object({
    brief: z.string().min(3),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.union([z.string().email(), z.string().max(0)]),
    address: z.string().optional(),
    emiratesId: z.union([z.string()
        .regex(emiratesIdRegex, {
            message: "Emirates ID must be a 15-digit number."
        }), z.string().max(0)]),
    authorityId: z.string().optional(),
})

export type UserPromptSchema = z.infer<typeof userPromptSchema>