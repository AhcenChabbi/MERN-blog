import { z } from "zod";
// zod validation schema
export const emailSchema = z.string().email({ message: "Email not valid" });
export const passwordSchema = z
  .string()
  .min(8, { message: "Password too short" })
  .max(255, {
    message: "Password too long",
  });
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const usernameSchema = z
  .string()
  .min(3, { message: "Username must be at least 3 characters long" })
  .max(20, { message: "Username must be at most 20 characters long" })
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username can only contain letters, numbers, and underscores",
  });
export const signUpSchema = loginSchema
  .extend({
    username: usernameSchema,
    confirmPassword: z.string().min(8).max(255),
  })
  .refine(({ confirmPassword, password }) => confirmPassword === password, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateUserPasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password cannot be the same as old password",
    path: ["newPassword"],
  });
export const UpdateUserSchema = z.object({
  profile: z.string().min(1),
  username: usernameSchema,
  email: emailSchema,
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(100, { message: "Bio must be at most 100 characters" }),
});

export const blogSchema = z.object({
  banner: z.string().min(1, { message: "Banner is required" }),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9 ]*$/, {
      message: "Title can only contain letters, numbers, and spaces",
    }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(5000, { message: "Content must be at most 5000 characters" }),
});
export const BlogName = "DevLog";
