import {z} from 'zod';

export const blogSchema = z.object({
    blogtitle: z.string().min(1, "Name is required"),
    blogcontent:z.string().min(1),
})

export type BlogSchema = z.infer<typeof blogSchema>