import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { Category, User, Donation, UserSocials } from "@/types";
import { LinkIcon } from "lucide-react";
import { BtnShare } from "./BtnShare";
import { Skeleton } from "@/components/ui/skeleton";
import { SupportList } from "./SupportList";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { socialLinks } from "@/lib/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const About = ({
  user,
  donations,
  fetchingDonations,
  skipDonations,
  setSkipDonations,
}: {
  user: User | undefined;
  donations: Donation[] | undefined;
  fetchingDonations: boolean;
  skipDonations: number;
  setSkipDonations: React.Dispatch<React.SetStateAction<number>>;
}) => {
  console.log(user);

  return (
    <div
      className="relative flex w-full flex-col rounded-lg bg-background p-6 drop-shadow-lg dark:bg-secondary"
      key={"about"}
    >
      {user && <BtnShare user={user} />}

      {user?.name ? (
        <Fragment>
          <h1 className="text-md font-semibold">About {user?.name}</h1>
          <p className="justify-left mt-[-3px] flex items-center text-sm">
            {user?.totalSupporters} Followers
          </p>
          <br />
        </Fragment>
      ) : (
        <div className="mb-4 space-y-2">
          <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200" />
        </div>
      )}

      {user?.avatar ? (
        <Image
          src={user.avatar}
          width={150}
          height={150}
          quality={100}
          className="mx-auto h-[200px] w-[200px] rounded-full object-cover"
          alt="User Avatar"
        />
      ) : (
        <Skeleton className="mx-auto h-[200px] w-[200px] rounded-full bg-gray-200 object-cover" />
      )}

      {user?.about ? (
        <p className="text-md mb-4 mt-6">{user?.about}</p>
      ) : (
        <div className="">
          <div className="mb-10 space-y-2">
            <Skeleton className="mt-4 h-4 w-full rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-full rounded-md bg-gray-200" />
          </div>
        </div>
      )}

      {user?.mainUrl && (
        <span className="mt-2 inline-block">
          <Link
            href={user?.mainUrl}
            target="_blank"
            className="items-center text-sm text-muted-foreground"
          >
            <LinkIcon size={20} className="mr-2 mt-[-5px] inline-block" />
            <span className="transition duration-150 hover:text-primary hover:underline">
              {user?.mainUrl}
            </span>
          </Link>
        </span>
      )}

      <div className="mt-4 flex w-1/3 flex-row items-center">
        {user?.socials?.length
          ? user.socials.map(
              ({ platform, accountName }: UserSocials, idx: number) => {
                if (accountName) {
                  return (
                    <TooltipProvider key={idx}>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Link
                            target="_blank"
                            className="mr-2 inline-block"
                            href={socialLinks[platform].urlPrefix + accountName}
                          >
                            {socialLinks[platform].icon}
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent className="w-auto min-w-10 rounded-3xl text-center">
                          <p className="text-xs font-normal">{accountName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                }
              }
            )
          : null}
      </div>

      <div className="mt-4 flex flex-wrap">
        {user?.categories?.length
          ? user.categories.map(({ title }: Category, idx: number) => (
              <Link
                key={idx}
                href={{
                  pathname: "/explore",
                  query: { category: title },
                }}
              >
                <span className="mr-2 mt-2 rounded-lg bg-secondary px-2  py-1 text-xs font-semibold text-gray-700 dark:bg-background dark:text-muted-foreground md:mt-0">
                  {title}
                </span>
              </Link>
            ))
          : null}
      </div>

      <div className="mt-6 border-t-2 border-gray-100 dark:border-muted-foreground">
        <p className="mt-6 text-left text-lg font-semibold">
          Recent supporters
        </p>

        {donations?.length ? (
          <SupportList
            donations={donations}
            fetchingDonations={fetchingDonations}
            skipDonations={skipDonations}
            setSkipDonations={setSkipDonations}
          />
        ) : !donations ? (
          <div className="flex h-40 items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <p className="mt-4 text-sm">Nothing yet.</p>
        )}
      </div>
    </div>
  );
};
