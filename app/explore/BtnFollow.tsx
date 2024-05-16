import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "@/app/api-hooks";
import { Plus } from "lucide-react";

export const BtnFollow = ({
  following = [],
  userId,
}: {
  following: string[];
  userId: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isFollowing, setIsFollowing] = useState<boolean>(
    following?.includes(userId)
  );
  const [btnFollowHovered, setBtnFollowHovered] = useState<boolean>(false);
  const { data: session } = useSession();
  const { mutate: _followUser } = useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: () => {
      const updatedFollowing = following.includes(userId)
        ? following.filter((id) => id !== userId)
        : [...following, userId];

      queryClient.setQueryData(["following"], updatedFollowing);
    },
  });

  const hdlUserFollow = (event: any, id: string) => {
    event.preventDefault();

    if (!session) {
      router.push("/account/login");
      return;
    }

    _followUser(id);
    setIsFollowing(!isFollowing);
  };

  if (!session || session.user.id !== userId) {
    return (
      <Fragment>
        {isFollowing ? (
          <Button
            onMouseEnter={() => setBtnFollowHovered(true)}
            onMouseLeave={() => setBtnFollowHovered(false)}
            onClick={(e) => hdlUserFollow(e, userId)}
            variant="secondary"
            className="my-auto mt-4 flex w-full items-center justify-center rounded-lg px-2 py-1 sm:mt-0 sm:w-auto md:px-4 md:py-2"
          >
            <span className="text-sm font-semibold text-primary">
              {btnFollowHovered ? "Unfollow" : "Following"}
            </span>
          </Button>
        ) : (
          <Button
            className="z-10 my-auto mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-2 py-1 dark:bg-background sm:mt-0 sm:w-auto md:px-4 md:py-2"
            onClick={(e) => hdlUserFollow(e, userId)}
          >
            <Plus className="opacity-1 mr-1 h-4 w-4 text-gray-300" />
            <span className="text-sm font-semibold text-white">Follow</span>
          </Button>
        )}
      </Fragment>
    );
  } else return null;
};
