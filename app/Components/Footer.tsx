import React from "react";
import { MainLayout } from "../Layouts/mainLayout";
import Link from "next/link";
import { siteConfig } from "@/siteConfig";
import { ThemeToggle } from "./themeToggle";

export const Footer = () => {
  const links = [
    {
      title: "Community Guidelines",
      url: "/privacy",
    },
    {
      title: "Terms",
      url: "/terms",
    },
    {
      title: "Privacy Policy",
      url: "/privacy",
    },
  ];

  return (
    <footer className="mx-8 mt-20 select-none py-4">
      <MainLayout>
        <div className="flex items-center justify-center text-sm font-semibold text-muted-foreground sm:text-xs">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-y-0">
            <span className="mr-6">© {siteConfig.appName}, Inc.</span>
            {links.map(({ title, url }, idx: number) => (
              <span
                className="transition duration-300 hover:text-primary"
                key={idx}
              >
                <Link href={url}>{title}</Link>
              </span>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </MainLayout>
    </footer>
  );
};
