import { Category } from "@/types";
import { ctx } from "..";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { categories } = (await ctx.get("/api/categories")).data;

    return categories;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};
