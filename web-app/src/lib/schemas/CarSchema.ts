import {z} from 'zod';

export const carSchema = z.object({
    name: z.string().min(3),
    plateNumber:z.string().min(1),
    model:z.string().optional(),
})

export type CarSchema = z.infer<typeof carSchema>