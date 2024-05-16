import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchNotifications, markAsReadNotifications } from "@/app/api-hooks";
import { supabase } from "@/lib/supabase";
import { Notification } from "@/types";
import { Bell, Settings } from "lucide-react";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AvatarDefault } from "./AvatarDefault";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";

export const Notifications = ({ userId }: { userId: string }) => {
  const queryClient = useQueryClient();
  const [allNotificationsRead, setAllNotificationsRead] =
    useState<boolean>(true);

  const { mutate: markAsRead } = useMutation({
    mutationFn: markAsReadNotifications,
  });

  const { data: notifications, refetch: refetchNotifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { notifications, allRead } = await fetchNotifications();
      setAllNotificationsRead(allRead);

      return notifications;
    },
  });

  useEffect(() => {
    const notificationsListener = supabase
      .channel("notifications-update")
      .on(
        // @ts-ignore
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Notification",
          columns: ["createdAt", "message", "userId"],
        },
        (payload: any) => {
          if (payload.new.userId !== userId) return;
          setAllNotificationsRead(false);

          queryClient.setQueryData(["notifications"], (prevData: any) => {
            if (!prevData?.length) return;
            const { createdAt, message } = payload.new;

            const duplicateMessage = prevData?.find(
              (notification: Notification) => notification.message === message
            );

            if (duplicateMessage) return;

            const newData = [{ createdAt, message }, ...prevData];

            return newData;
          });
        }
      )
      .subscribe();

    return () => {
      notificationsListener.unsubscribe();
    };
  }, [queryClient, userId, refetchNotifications, notifications]);

  const hdlReadNotifications = () => {
    setAllNotificationsRead(true);
    markAsRead();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className="relative mr-4 flex rounded-full bg-gray-100 p-2 transition duration-150 hover:bg-gray-200 dark:bg-secondary"
          onClick={hdlReadNotifications}
        >
          <Bell size={18} className="cursor-pointer text-primary" />
          {!allNotificationsRead && (
            <span className="absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full bg-blue-400 text-center text-white" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto px-6 py-4"
        align="end"
        style={{ zIndex: 9999999 }}
      >
        <div className="flex flex-col">
          <div className="mb-4 flex items-center">
            <p className="mr-auto text-sm font-semibold">Inbox</p>
            <Link
              href={{
                pathname: "/account/profile",
                query: { settings: "notifications" },
              }}
            >
              <Settings
                className="text-muted-foreground hover:text-primary"
                size={17}
              />
            </Link>
          </div>
          <div className="items-left flex flex-col justify-center space-y-2 pt-2">
            {notifications?.length ? (
              notifications
                .slice(0, 10)
                .map(({ message, createdAt }: Notification, idx: number) => (
                  <div className="justify-left flex items-center" key={idx}>
                    <span className="mr-2">
                      <Avatar className="h-8 w-8">
                        <AvatarDefault />
                      </Avatar>
                    </span>
                    <div className="flex flex-col space-y-0">
                      <span className="text-sm">{message}</span>
                      <span className="text-xs text-muted-foreground">
                        {moment(createdAt).fromNow()}
                      </span>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center">Looks like there is nothing</p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
