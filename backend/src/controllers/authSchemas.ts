import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z
  .string()
  .min(8, { message: "Password is too short" })
  .max(255, {
    message: "Password is too long",
  });
const usernameSchema = z
  .string()
  .min(3)
  .max(30)
  .regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed");
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});
export const updateUserSchema = z.object({
  profile: z.string().min(1).optional(),
  username: usernameSchema.optional(),
  email: emailSchema.optional(),
  bio: z
    .string()
    .min(1, { message: "Bio is required" })
    .max(100, { message: "Bio must be at most 100 characters" })
    .optional(),
});
export const updateUserPasswordSchema = z.object({
  oldPassword: passwordSchema,
  newPassword: passwordSchema,
  confirmNewPassword: passwordSchema,
});
export const registerSchema = loginSchema
  .extend({
    username: usernameSchema,
    confirmPassword: z.string().min(8).max(255),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verificationCodeSchema = z.string().min(1).max(24);
export const resetPasswordSchema = z.object({
  verificationCode: verificationCodeSchema,
  password: passwordSchema,
});
