import { z } from "zod";

export const blogSchema = z.object({
  banner: z.string(),
  title: z.string(),
  content: z.string(),
});

export const stringArraySchema = z.object({
  blogIds: z.array(z.string()),
});
