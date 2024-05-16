"use client";

import React, { Fragment } from "react";
import { motion } from "framer-motion";

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.35 }}
      >
        {children}
      </motion.div>
    </Fragment>
  );
};
