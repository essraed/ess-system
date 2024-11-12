import {z} from 'zod';

export const authoritySchema = z.object({
    name: z.string().min(3),
})

export type AuthoritySchema = z.infer<typeof authoritySchema>