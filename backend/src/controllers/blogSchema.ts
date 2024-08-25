import { z } from "zod";

export const blogSchema = z.object({
  banner: z.string(),
  title: z.string(),
  content: z.string(),
});
export const updateBlogSchema = z.object({
  banner: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
});
export const stringArraySchema = z.object({
  blogIds: z.array(z.string()),
});
