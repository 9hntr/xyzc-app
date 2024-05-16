import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { User } from "@/types";
import { updateUser } from "@/app/api-hooks";
import { useMutation } from "@tanstack/react-query";

export const Notifications = ({ user }: { user: User }) => {
  const [notifyDonation, setNotifyDonation] = useState<boolean>(
    user.notifyDonation
  );
  const [notifyNewFollower, setNotifyNewFollower] = useState<boolean>(
    user.notifyNewFollower
  );

  const { mutate: updateUserData } = useMutation({
    mutationFn: (data) => updateUser(data),
  });

  const hdlUpdate = (data: any) => {
    updateUserData(data);
  };

  return (
    <div className="w-full px-6">
      <p className="mt-2 text-lg font-semibold text-primary">Notifications</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Select the kinds of notifications you’d like receive to your email and
        in-app notifications center
      </p>
      <div className="mt-8 flex flex-col items-center justify-center space-y-6 rounded-lg border-2 p-6">
        <div className="flex w-full">
          <div>
            <p className="block text-lg font-semibold">Donations</p>
            <p className="text-sm text-muted-foreground">
              When you receive a donation
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Switch
              id="donations"
              checked={notifyDonation}
              onCheckedChange={() => {
                const updatedAttr = !notifyDonation;
                setNotifyDonation(updatedAttr);

                hdlUpdate({
                  notifyDonation: updatedAttr,
                });
              }}
            />
          </div>
        </div>

        <div className="flex w-full">
          <div>
            <p className="block text-lg font-semibold">Followers</p>
            <p className="text-sm text-muted-foreground">
              When you get a new follower
            </p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <Switch
              id="followers"
              checked={notifyNewFollower}
              onCheckedChange={() => {
                const updatedAttr = !notifyNewFollower;
                setNotifyNewFollower(updatedAttr);

                hdlUpdate({
                  notifyNewFollower: updatedAttr,
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
