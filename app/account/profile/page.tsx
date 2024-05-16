"use client";

import { MainLayout } from "@/app/Layouts/mainLayout";
import { fetchCategories, fetchUserData } from "@/app/api-hooks";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState, Suspense } from "react";
import { PersonalInfo } from "./personal-info";
import { Account } from "./account";
import { Payments } from "./payments";
import { Navbar } from "@/app/Components/Navbar";
import { Category, User } from "@/types";
import { Notifications } from "./notifications";

const profileSettingsIds = ["profile", "account", "personal", "notifications"];

const ProfilePage = ({ settings }: { settings: string }) => {
  const isValidSettingsParam = profileSettingsIds.includes(settings);

  const [fixSidebar, setFixSidebar] = useState<boolean>(false);

  const profileSettings = [
    {
      id: "profile",
      title: "Profile",
      renderComponent: (
        user: User,
        categories: Category[],
        refetchUser: any
      ) => (
        <PersonalInfo
          user={user}
          categories={categories}
          refetchUser={refetchUser}
        />
      ),
    },
    {
      id: "account",
      title: "Account",
      renderComponent: (user: User) => <Account user={user} />,
    },
    {
      id: "payments",
      title: "Payments",
      renderComponent: (user: User) => <Payments />,
    },
    {
      id: "notifications",
      title: "Notifications",
      renderComponent: (user: User) => <Notifications user={user} />,
    },
  ];

  const settingsIdx = isValidSettingsParam
    ? profileSettings.findIndex((i) => i.id === settings)
    : 0;
  const [profileSectionIdx, setProfileSectionIdx] =
    useState<number>(settingsIdx);

  const {
    isLoading: categoriesLoading,
    data: categories,
    error: categoriesError,
  } = useQuery({ queryKey: ["categories"], queryFn: () => fetchCategories() });

  const {
    isLoading: userLoading,
    data: user,
    error: userError,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUserData,
  });

  const hdlFixSidebar = () => {
    if (window.scrollY >= 116) {
      setFixSidebar(true);
    } else setFixSidebar(false);
  };

  useEffect(() => {
    if (window) window.addEventListener("scroll", hdlFixSidebar);
  }, []);

  return (
    <Suspense>
      <div className="mt-[4rem] w-full">
        <Navbar />
        <MainLayout>
          <div className="ml-6 w-full md:ml-8">
            <h1 className="pb-12 pt-12 text-left text-4xl font-bold text-primary">
              Profile Settings
            </h1>
          </div>
          <div className="flex flex-col md:flex-row">
            <div
              className={`mb-8 ml-0 mr-0 w-full md:mb-0 md:ml-8 md:w-0 ${
                fixSidebar ? "md:fixed md:mt-[-116px]" : ""
              } mr-auto`}
            >
              <ul className="md:justify-left flex w-full justify-center pt-2 md:w-0 md:flex-col">
                {profileSettings.map(({ title }, idx: number) => (
                  <li
                    key={idx}
                    onClick={() => setProfileSectionIdx(idx)}
                    className={`mr-2 mt-2 cursor-pointer md:mr-0 md:border-none ${
                      idx === profileSectionIdx
                        ? "border-b-2 border-primary"
                        : ""
                    }`}
                  >
                    <span
                      className={`text-md text-muted-foreground md:text-primary xl:text-xl ${
                        idx === profileSectionIdx ? "font-bold" : "font-regular"
                      }`}
                    >
                      {title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ml-auto flex w-full flex-col pb-8 md:w-4/5">
              {user &&
                profileSettings[profileSectionIdx].renderComponent(
                  user,
                  categories as [],
                  refetchUser
                )}
            </div>
          </div>
        </MainLayout>
      </div>
    </Suspense>
  );
};

const Page = ({
  searchParams: { settings },
}: {
  searchParams: { settings: string };
}) => {
  return (
    <Suspense fallback={<div>.</div>}>
      <ProfilePage settings={settings} />
    </Suspense>
  );
};

export default Page;
