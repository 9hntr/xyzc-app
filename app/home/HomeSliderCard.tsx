import React from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";

export const HomeSliderCard = ({ user }: { user: any }) => {
  return (
    <div className="slider-card flex min-h-[320px] w-[310px] select-none flex-col rounded-xl border-2 border-gray-100 bg-white px-2 pb-4 pt-2 shadow-sm dark:border-none dark:bg-secondary">
      <div className="relative h-36 w-full">
        <Image
          src={user.backgroundCover}
          width={500}
          height={340}
          quality={100}
          className="absolute left-0 top-0 h-full w-full rounded-xl object-cover"
          alt={"background"}
        />
      </div>
      <div className="relative mt-4">
        <span className="absolute left-[38%] top-[-50px] h-14 w-14 rounded-full border-2 border-white">
          <Avatar className="absolute left-0 top-0 h-full w-full">
            <Image
              width={100}
              height={100}
              quality={100}
              className="object-cover"
              src={user.avatar}
              alt={"alt"}
            />
          </Avatar>
        </span>
        <div className="mt-4 h-20 space-y-1 px-4 text-center">
          <p className="text-sm font-semibold">{user.username}</p>
          <p className="limit-text mb-4 overflow-hidden overflow-ellipsis break-all text-xs text-muted-foreground">
            {user.about}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap justify-center space-x-2">
          {user.categories.map(({ title }: any, idx: number) => (
            <span
              className="mt-2 rounded-lg bg-gray-100 px-2 py-1 text-[8px] font-semibold text-gray-700 md:mt-0"
              key={idx}
            >
              {title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
