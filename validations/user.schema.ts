import * as z from "zod";

export const updateUserPersonalSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(1, "Username must be at least 1 character")
    .max(20, "Username must have at max 20 characters"),
  mainUrl: z.string().nullish(),
  name: z.string().nullish(),
  about: z.string().nullish(),
  goalAmount: z.coerce.number().int().positive().min(1).max(100_000),
});

export const updateUserAccountSchema = z
  .object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const updateUserSocialsSchema = z.object({
  instagram: z.string().nullish(),
  x: z.string().nullish(),
  facebook: z.string().nullish(),
  github: z.string().nullish(),
  youtube: z.string().nullish(),
});
