import React, { Fragment } from "react";

import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "@/components/ui/avatar";
import { AvatarDefault } from "@/app/Components/AvatarDefault";
import { UserCard } from "@/types";
import { BtnFollow } from "./BtnFollow";
import { Verified } from "@/app/Components/icons/Verified";

const CardSkeleton = () => {
  return (
    <div className="flex transform transition duration-300 hover:scale-105">
      <div className="w-full overflow-hidden rounded-lg border-2 border-gray-100 bg-white px-2 pt-2 hover:border-gray-200 dark:border-none dark:bg-secondary">
        <Skeleton className="h-[140px] w-full rounded-xl dark:bg-background" />
        <div className="relative p-4">
          <Skeleton className="absolute bottom-[20px] top-[-40px] h-14 w-14 rounded-full border-2 border-white dark:border-secondary" />
          <div className="mt-[5px] flex flex-col">
            <Skeleton className="mb-2 mt-1 h-3 w-3/5 dark:bg-background" />
            <Skeleton className="h-3 w-2/5 dark:bg-background" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeaturedCreators = ({
  className,
  users,
  following,
  fetchingUsersStatus,
  fetchingFollowing,
}: {
  className: string;
  following: string[];
  users: UserCard[];
  fetchingUsersStatus: "error" | "success" | "pending";
  fetchingFollowing: boolean;
}) => {
  return (
    <div className={className}>
      {fetchingUsersStatus === "success" ? (
        <Fragment>
          {!users.length ? (
            <>No results found</>
          ) : !fetchingFollowing ? (
            users.map((userData, idx: number) => (
              <Fragment key={idx}>
                {userData ? (
                  <Link
                    href={`/${userData.username}`}
                    rel="noopener noreferrer"
                  >
                    <div className="flex transform rounded-lg bg-white transition duration-300 hover:scale-105 dark:bg-secondary">
                      <div className="w-full overflow-hidden rounded-lg border-2 border-gray-100 p-2 hover:border-gray-200 dark:border-secondary">
                        <span className="relative flex h-[140px] w-full rounded-xl bg-gray-200">
                          {userData.backgroundCover && (
                            <Image
                              src={userData.backgroundCover}
                              width={500}
                              height={340}
                              quality={100}
                              className="absolute left-0 top-0 h-full w-full rounded-xl object-cover"
                              alt={userData.username.slice(0, 3).toUpperCase()}
                            />
                          )}
                        </span>
                        <div className="relative p-4">
                          <span className="absolute bottom-[20px] top-[-40px] h-14 w-14 rounded-full border-2 border-white dark:border-secondary">
                            {userData.avatar ? (
                              <Avatar className="absolute left-0 top-0 h-full w-full">
                                <Image
                                  width={100}
                                  height={100}
                                  quality={100}
                                  className="object-cover"
                                  src={userData.avatar}
                                  alt={userData.username}
                                />
                              </Avatar>
                            ) : (
                              <Avatar className="absolute left-0 top-0 h-full w-full">
                                <AvatarDefault />
                              </Avatar>
                            )}
                          </span>
                          <div className="mt-[5px] flex h-auto flex-wrap sm:h-8">
                            <div className="mr-auto pr-4">
                              <p className="flex text-xs font-bold">
                                {userData.username}

                                {userData.verified && (
                                  <span className="ml-1">
                                    <Verified />
                                  </span>
                                )}
                              </p>
                              <p className="text-xs">
                                {userData.totalSupporters ?? 0}{" "}
                                {userData.totalSupporters === 1
                                  ? "follower"
                                  : "followers"}
                              </p>
                            </div>
                            {following && (
                              <BtnFollow
                                userId={userData.id}
                                following={following}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <CardSkeleton />
                )}
              </Fragment>
            ))
          ) : null}
        </Fragment>
      ) : fetchingUsersStatus === "pending" ? (
        <Fragment>
          {Array.from({ length: 6 }).map((_, idx: number) => (
            <CardSkeleton key={idx} />
          ))}
        </Fragment>
      ) : (
        <p>Something went left.</p>
      )}
    </div>
  );
};
