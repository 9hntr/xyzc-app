import React, { Fragment } from "react";
import { Avatar } from "@/components/ui/avatar";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { AvatarDefault } from "../Components/AvatarDefault";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { singleCoffeePrice } from "@/lib/constants";
import { ChevronDown, Flag } from "lucide-react";
import { Donation } from "@/types";

export const SupportList = ({
  donations,
  fetchingDonations,
  skipDonations,
  setSkipDonations,
}: {
  donations: Donation[] | undefined;
  fetchingDonations: boolean;
  skipDonations: number;
  setSkipDonations: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <Fragment>
      <ScrollArea
        className={`${
          donations && donations.length < 3 ? "h-auto" : "h-42"
        } mt-4 w-full rounded-md`}
      >
        <div className="mr-6 pb-4">
          {donations?.length &&
            donations.map(
              ({ name, message, amount }: Donation, idx: number) => (
                <div key={idx} className="flex gap-4 pt-4">
                  <Avatar>
                    <AvatarDefault />
                  </Avatar>
                  <div className="flex w-full flex-col justify-center md:w-4/5">
                    <p className="text-sm font-light">
                      <span className="mr-1 font-semibold">
                        {name.length ? name : "Someone"}{" "}
                      </span>
                      {amount > singleCoffeePrice
                        ? `gifted ${amount / singleCoffeePrice} coffees`
                        : "gifted a coffee"}
                    </p>
                    {message && (
                      <div className="mt-1 rounded-lg bg-secondary px-4  py-2 dark:bg-background">
                        <p className="limit-text overflow-hidden overflow-ellipsis break-all text-xs font-light">
                          {message}
                        </p>
                      </div>
                    )}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="cursor-pointer">
                        <span className="mr-px h-px w-px select-none font-bold text-muted-foreground">
                          .
                        </span>
                        <span className="mr-px h-px w-px select-none font-bold text-muted-foreground">
                          .
                        </span>
                        <span className="mr-px h-px w-px select-none font-bold text-muted-foreground">
                          .
                        </span>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="mt-[-18px] w-40 p-2">
                      <div className="flex cursor-pointer flex-wrap items-center space-x-2 rounded-md p-2 text-xs hover:bg-secondary">
                        <Flag size={15} />
                        <span className="text-xs">Report Abuse</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              )
            )}
        </div>
      </ScrollArea>
      {donations?.length && donations.length >= 3 ? (
        <button
          disabled={fetchingDonations}
          className="mt-4 flex w-full items-center justify-center rounded-3xl border-2 border-gray-100 py-2 text-sm font-semibold hover:bg-secondary dark:border-none dark:hover:bg-background"
          onClick={() => setSkipDonations(skipDonations + 3)}
        >
          See more
          <span className="ml-2">
            {fetchingDonations ? (
              <LoadingSpinner size={4} />
            ) : (
              <ChevronDown size={17} />
            )}
          </span>
        </button>
      ) : null}
    </Fragment>
  );
};
