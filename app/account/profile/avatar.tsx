import { User, ImageUpload } from "@/types";
import React from "react";
import Image from "next/image";
import { ImageUp } from "lucide-react";
import { AvatarDefault } from "@/app/Components/AvatarDefault";

export const Avatar = ({
  user,
  setUploadType,
  setUploadDialogOpen,
}: {
  user: User;
  setUploadType: React.Dispatch<React.SetStateAction<ImageUpload>>;
  setUploadDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="relative mb-10 ml-[2rem] mt-[-10rem] flex h-32 w-32 select-none rounded-full">
      <AvatarDefault />
      <button
        onClick={() => {
          setUploadType("avatar");
          setUploadDialogOpen(true);
        }}
        className="z-10 ml-1 mt-1 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-[rgba(0,0,0,.5)] opacity-0 transition-opacity hover:opacity-100"
      >
        <ImageUp className="text-white" size={20} />
      </button>

      {user.avatar && (
        <Image
          src={user.avatar}
          width={300}
          height={300}
          className="absolute left-0 top-0 aspect-square rounded-full object-cover"
          alt={"avatar"}
        />
      )}
    </div>
  );
};
