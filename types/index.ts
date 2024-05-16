import { categories } from "@/lib/constants";

export type Todo = any;

export type GridType = 1 | 2;

export type Theme = "light" | "dark";

export type CategoryTitle = typeof categories;

export type Socials = {
  instagram?: string;
  x?: string;
  facebook?: string;
  youtube?: string;
  github?: string;
};

export type UserCard = {
  id: string;
  username: string;
  backgroundCover: string;
  avatar: string;
  totalSupporters: number;
  verified: boolean;
};

export type FetchUsers = {
  query: string;
  limit: number;
  categories: number[];
  page: number;
};

export type NotificationResponse = {
  notifications: Notification[];
  allRead: boolean;
};

export type NewDonation = {
  targetId: string;
  amount: number | string;
  name: string;
  message: string;
};

export type Category = {
  id: number;
  title: string;
  thumbnail: string;
};

export type UserRegister = {
  name?: string;
  username?: string;
  email: string;
  password: string;
};

export type Notification = {
  id?: number;
  isRead?: boolean;
  userId?: string;
  message: string;
  createdAt: Date;
};

export type Donation = {
  name: string;
  message: string;
  amount: number;
  createdAt: Date;
};

export type UserSocials = {
  platform: string;
  accountName: string;
};

export type User = {
  id: string;
  name?: string;
  username: string;
  about?: string;
  email: string;
  avatar?: string;
  backgroundCover?: string;
  mainUrl?: string;
  goalAmount?: number;
  notifyDonation: boolean;
  notifyNewFollower: boolean;
  totalGains?: number;
  totalProgress?: number;
  totalSupporters?: number;
  categories?: Category[];
  donations?: Donation[];
  socials?: UserSocials[];
};

export type interestsCategories = {
  title: string;
  thumbnail: string;
};

export type ImageUpload = "avatar" | "backgroundCover";
