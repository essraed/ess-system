import { z } from "zod";
import { postSchema } from "./PostSchema";

export const blogSchema = z.object({
  blogtitle: z.string().min(1, "Name is required"),
  blogcontent: z.string().min(1),
  posts: z.array(postSchema).optional(),
});

export type BlogSchema = z.infer<typeof blogSchema>;
