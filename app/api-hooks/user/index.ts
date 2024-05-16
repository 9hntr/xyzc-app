import { sleep } from "@/lib/utils";
import { ctx } from "..";
import {
  NewDonation,
  NotificationResponse,
  Todo,
  User,
  Socials,
} from "@/types";

export const getUserFollowing = async () => {
  try {
    const { following } = (await ctx.get("/api/user/follows")).data;

    return following;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const updateUserSocials = async (data: Socials) => {
  try {
    const { user } = (await ctx.post(`/api/user`, data)).data;

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const followUser = async (followingId: string) => {
  try {
    return (
      await ctx.post("/api/user/follows", {
        followingId,
      })
    ).data;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const markAsReadNotifications = async () => {
  try {
    return (await ctx.post("/api/user/notifications")).data;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const fetchNotifications = async (): Promise<NotificationResponse> => {
  try {
    const data = (await ctx.get("/api/user/notifications")).data;

    return data;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const hdlUserPayment = async (data: NewDonation) => {
  try {
    const { newDonation } = (await ctx.post("/api/user/donations", data)).data;

    return newDonation;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const fetchDonationsByUsername = async (
  username: string,
  skipDonations: number
): Promise<Todo> => {
  try {
    const { donations, countDonations } = (
      await ctx.get(
        `/api/user/donations?username=${username}&skipDonations=${skipDonations}`
      )
    ).data;

    return { donations, countDonations };
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const deleteUser = async (): Promise<{ deleted: boolean }> => {
  try {
    const { deleted } = (await ctx.delete(`/api/user`)).data;

    console.log("file: index.ts:51 ⌿ deleteUser ⌿ deleted* ", deleted);
    return deleted;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const updateUser = async (data: Todo): Promise<User> => {
  try {
    const { user } = (await ctx.post(`/api/user`, data)).data;

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const fetchUserData = async (): Promise<User> => {
  try {
    const { user } = (await ctx.get(`/api/user`)).data;

    return user;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};

export const uploadMedia = async (data: Todo): Promise<string> => {
  try {
    const { url } = (await ctx.post(`/api/user/media`, data)).data;

    return url;
  } catch (error: any) {
    let errorMessage = "Something went wrong";
    if (error?.response?.data) errorMessage = error?.response?.data;

    throw new Error(errorMessage);
  }
};
