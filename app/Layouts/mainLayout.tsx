import React from "react";
import { PageTransition } from "@/app/Components/Transition";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-auto mx-[1rem] lg:mx-[10rem] 2xl:mx-[16rem]">
      <PageTransition>{children}</PageTransition>
    </div>
  );
};
