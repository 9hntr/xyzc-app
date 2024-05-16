import React from "react";
import { motion } from "framer-motion";

export const BtnMadeBy = () => {
  return (
    <motion.button
      className="radial-gradient relative mx-auto mb-4 max-w-md rounded-full px-3 py-1"
      // @ts-ignore
      initial={{ "--x": "100%", scale: 1 }}
      // @ts-ignore
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.95 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
    >
      <span className="linear-mask relative block h-full w-full text-xs font-light tracking-wide text-neutral-800 dark:text-gray-400">
        ✨ made by creators, for creators.
      </span>
      <span className="linear-overlay absolute inset-0 block rounded-full p-px" />
    </motion.button>
  );
};
