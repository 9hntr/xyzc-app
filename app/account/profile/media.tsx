import React, { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "@/app/api-hooks";
import { Todo, User, ImageUpload } from "@/types";
import { Cover } from "./cover";
import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/app/Components/LoadingSpinner";
import { Avatar } from "./avatar";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Media = ({
  user,
  refetchUser,
}: {
  user: User;
  refetchUser: any;
}) => {
  const [uploadType, setUploadType] = useState<ImageUpload>("avatar");
  const [isUploadAllowed, setUploadAllowed] = useState<boolean>(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState<boolean>(false);
  const { data: session, update: updateSession } = useSession();

  const { mutate: _uploadMedia, isPending: imageUploading } = useMutation({
    mutationFn: (data: Todo) => {
      setUploadAllowed(false);
      return uploadMedia(data);
    },
    onSuccess: async (url: string) => {
      if (uploadType === "avatar") {
        updateSession({
          ...session,
          user: {
            ...session?.user,
            avatar: url,
          },
        });
      }

      setUploadDialogOpen(false);
      setUploadAllowed(true);
      await refetchUser();
    },
    onError: async () => {
      setUploadAllowed(true);
    },
  });

  const handleFileUpload = (e: any) => {
    e.preventDefault();

    setUploadType(e.target.name);

    const image = e.target.files[0];
    if (!image) return;

    const formData = new FormData();
    formData.append(e.target.name, image);

    _uploadMedia(formData);
  };

  const uploadTypeTextMap = {
    backgroundCover: {
      title: "Update cover",
      description:
        "We recommend to upload images in 1440x360 resolution. Max 15 MB in JPEG or PNG format",
    },
    avatar: {
      title: "Update avatar",
      description:
        "We recommend to upload images in 400x400 resolution. Max 5 MB in JPEG, PNG or GIF format",
    },
  };

  return (
    <div>
      <AlertDialog open={uploadDialogOpen}>
        <AlertDialogContent className="max-w-full md:max-w-xs">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {uploadTypeTextMap[uploadType].title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {uploadTypeTextMap[uploadType].description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="default"
              className="relative rounded-lg text-xs"
            >
              {imageUploading ? (
                <Fragment>
                  <LoadingSpinner size={3} />
                  <span className="ml-2 text-sm">Uploading file</span>
                </Fragment>
              ) : (
                <span className="text-sm">Browse file</span>
              )}
              <input
                disabled={!isUploadAllowed}
                name={uploadType}
                onChange={handleFileUpload}
                type="file"
                accept="image/*"
                className="absolute h-full w-full rounded-full opacity-0"
              />
            </Button>
            <AlertDialogCancel asChild>
              <Button
                onClick={() => setUploadDialogOpen(false)}
                type="button"
                variant="outline"
                className="text-sm"
              >
                Cancel
              </Button>
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Cover
        user={user}
        setUploadType={setUploadType}
        setUploadDialogOpen={setUploadDialogOpen}
      />
      <Avatar
        user={user}
        setUploadType={setUploadType}
        setUploadDialogOpen={setUploadDialogOpen}
      />
    </div>
  );
};
