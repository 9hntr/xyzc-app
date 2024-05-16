import queryString from "query-string";
import { Todo, User, UserRegister, FetchUsers, UserCard } from "@/types";
import { ctx } from "..";

export const signup = async (data: UserRegister) => {
  try {
    const { user } = (await ctx.post("/api/users/signup", data)).data;

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const fetchUsers = async ({
  query,
  limit,
  categories,
  page,
}: FetchUsers): Promise<{
  users: UserCard[];
  currentPage: number;
  nextPage: number | null;
}> => {
  try {
    const queryParams = {
      page: page,
      limit: limit,
      query: query,
      categories: String(categories),
    };

    const q = queryString.stringify(queryParams);
    const url = "/api/users?" + q;

    const { users, currentPage, nextPage } = (await ctx.get(url)).data;

    return { users, currentPage, nextPage };
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const fetchProfileByUsername = async (
  username: string
): Promise<Todo> => {
  try {
    const { user } = (await ctx.get(`/api/users/profile?username=${username}`))
      .data;

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const queryUsers = async (): Promise<User[]> => {
  try {
    const { users } = (await ctx.get(`/api/users/search`)).data;

    return users;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};
