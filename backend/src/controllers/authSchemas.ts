import { z } from "zod";

export const emailSchema = z.string().email().min(1).max(255);
const passwordSchema = z.string().min(8).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  userAgent: z.string().optional(),
});

export const registerSchema = loginSchema
  .extend({
    username: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9]+$/, "Only alphanumeric characters are allowed"),
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
