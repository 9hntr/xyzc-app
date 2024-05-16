"use client";

import { GridType } from "@/types";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

export const TabSlider = ({
  tabs,
  activeTab,
  setActiveTab,
}: {
  tabs: {
    id: GridType;
    label: () => JSX.Element;
  }[];
  activeTab: GridType;
  setActiveTab: Dispatch<SetStateAction<GridType>>;
}) => {
  return (
    <div className="flex w-full rounded-xl bg-secondary p-1">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`rounded-fullpx-3 relative flex w-1/2 items-center justify-center py-1.5 text-sm font-medium ${activeTab === id ? "text-primary" : "text-gray-500"} outline-none hover:text-primary`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === id && (
            <motion.span
              layoutId="bubble"
              className="absolute z-0 h-full w-full select-none rounded-lg bg-background"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="z-50 flex ">{label()}</span>
        </button>
      ))}
    </div>
  );
};
