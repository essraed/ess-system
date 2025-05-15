
import { z } from 'zod';
export const postSection = z.object({
  subHeader: z.string().min(1, "Subheader is required"),
  content: z.string().min(1, "Content is required"),
});

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  postSections: z.array(postSection).optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
