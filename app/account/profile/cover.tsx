import React, { Fragment, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ImageUpload, User } from "@/types";

export const Cover = ({
  user,
  setUploadType,
  setUploadDialogOpen,
}: {
  user: User;
  setUploadType: React.Dispatch<React.SetStateAction<ImageUpload>>;
  setUploadDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const AnimatedButton = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute right-4 top-4 z-10"
      >
        <Button
          onClick={() => {
            setUploadType("backgroundCover");
            setUploadDialogOpen(true);
          }}
          className="font-semibold"
        >
          Edit cover
        </Button>
      </motion.div>
    );
  };

  return (
    <Fragment>
      <motion.div
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        className="relative mb-20 flex h-[240px] w-full rounded-2xl bg-gray-100"
      >
        {isHovered && <AnimatedButton />}
        {user.backgroundCover && (
          <Image
            src={user.backgroundCover}
            width={1000}
            height={1000}
            className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover"
            alt={"background cover"}
          />
        )}
      </motion.div>
    </Fragment>
  );
};
