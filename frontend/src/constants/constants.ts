import { z } from "zod";
export const emailSchema = z.string().email({ message: "Email not valid" });
export const passwordSchema = z.string().min(8).max(255);
export const BlogName = "DevLog";
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const signUpSchema = loginSchema
  .extend({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username must be at most 20 characters long" })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message: "Username can only contain letters, numbers, and underscores",
      }),
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const allowedFileTypes = ["image/jpeg", "image/png"];

export const blogSchema = z.object({
  banner: z
    .instanceof(File, { message: "Banner is required" })
    .refine(
      (file) =>
        allowedFileTypes.includes(file.type) && file.size <= 5 * 1024 * 1024,
      {
        message: "File must be an image (JPEG, PNG, GIF) and not exceed 5MB",
      }
    ),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Title can only contain letters, numbers, and spaces",
    })
    .refine((title) => title.trim() === title, {
      message: "Title must not have leading or trailing spaces",
    }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(5000, { message: "Content must be at most 5000 characters" }),
});
export interface IBlog {
  banner: string;
  title: string;
  content: string;
}
