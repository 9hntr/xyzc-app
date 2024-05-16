import React from "react";
import { Trophy } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarDefault } from "@/app/Components/AvatarDefault";
import { LoadingSpinner } from "../Components/LoadingSpinner";

export const TopSupporters = ({ topSupporters }: { topSupporters: any }) => {
  return (
    <div className="flex h-auto w-full flex-col rounded-xl bg-background px-6 pb-6 drop-shadow-lg dark:bg-secondary">
      <p className="mt-6 text-left text-lg font-semibold">Top supporters</p>

      {topSupporters?.length ? (
        <ul className="h-34 mt-4">
          {topSupporters.map(
            (
              { name, totalCoffees }: { name: string; totalCoffees: number },
              idx: number
            ) => (
              <li
                key={idx}
                className="flex flex-wrap items-center rounded-xl py-2"
              >
                <Trophy size={17} className="mr-1 text-primary" />
                <span className="mr-2 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <Avatar className="mr-2 h-6 w-6">
                  <AvatarDefault />
                </Avatar>
                <span className="text-sm text-primary">
                  {name.length ? name : "Anonymous"}
                </span>
                <span className="ml-auto text-xs">{totalCoffees} coffees</span>
              </li>
            )
          )}
        </ul>
      ) : topSupporters === null ? (
        <div className="flex h-32 w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <p className="mt-4 text-sm">Nothing yet.</p>
      )}
    </div>
  );
};
