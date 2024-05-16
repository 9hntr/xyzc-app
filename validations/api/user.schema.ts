import { z } from "zod";
import { categories } from "@/lib/constants";

export const updateUserSchema = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .min(1)
      .max(20)
      .optional(),
    mainUrl: z.string().optional().nullable(),
    name: z.string().optional().nullable(),
    about: z.string().optional().nullable(),
    goalAmount: z.number().min(1).max(100_000).optional(),
    notifyDonation: z.boolean().optional(),
    notifyNewFollower: z.boolean().optional(),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Invalid email address")
      .optional(),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6)
      .max(128)
      .optional(),
    confirmPassword: z.string().optional(),
    socials: z.any().optional(),
    categories: z
      .array(z.string())
      .max(4)
      .optional()
      .refine(
        (values) => {
          if (!values) return true;
          return values?.every((value) => categories.includes(value));
        },
        {
          message: "Invalid categories",
        }
      ),
  })
  .refine(
    (data) => {
      if (data?.password || data?.confirmPassword) {
        return data.password === data.confirmPassword;
      }

      return true;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );
