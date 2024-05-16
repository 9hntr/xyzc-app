"use client";

import Link from "next/link";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { MainLayout } from "@/app/Layouts/mainLayout";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Newspaper, Search, Settings2, User } from "lucide-react";
import { useWindowSize } from "@/app/hooks";
import { AvatarDefault } from "./AvatarDefault";
import { Notifications } from "./Notifications";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { siteConfig } from "@/siteConfig";

export const Navbar = ({ floating = false }: { floating?: boolean }) => {
  const { data: session } = useSession();
  const { width } = useWindowSize();

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    if (width) setIsSmallScreen(width <= 640);
  }, [width]);

  return (
    <div
      className={`fixed top-0 w-full px-4 py-2 ${floating ? "bg-none" : "bg-background"} `}
      style={{ zIndex: 9 }}
    >
      <MainLayout>
        <nav className="flex rounded-full bg-secondary px-6 py-1 shadow-sm">
          <div className="flex items-center justify-center">
            <Link href="/" title={siteConfig.domain}>
              <Image
                src={"/logo.png"}
                width={100}
                height={100}
                className="mt-[-10px] h-16 w-16 object-cover"
                alt="Xyzc"
              />
            </Link>
          </div>
          {/* 
          <Link
            href="/faq"
            className="text-md ml-2 flex items-center justify-center font-semibold text-primary md:ml-6"
          >
            <span className="text-sm">FAQ</span>
          </Link> */}

          {!session?.user && (
            <Link
              href="/explore"
              className="text-md ml-2 flex items-center justify-center font-semibold text-primary md:ml-6"
            >
              {isSmallScreen ? (
                <Search className="h-4 w-4" />
              ) : (
                <span className="text-sm">Explore</span>
              )}
            </Link>
          )}

          <div className="mr-auto"></div>
          {session?.user ? (
            <Fragment>
              <div className="flex items-center justify-center">
                <Notifications userId={session?.user?.id} />
                <Popover>
                  <PopoverTrigger asChild>
                    <Avatar className="h-8 w-8 cursor-pointer">
                      {!session?.user.avatar ? (
                        <AvatarDefault />
                      ) : (
                        <AvatarImage
                          src={session.user.avatar}
                          className="object-cover"
                        />
                      )}
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-48 px-2 py-2"
                    align="end"
                    style={{ zIndex: 9999999 }}
                  >
                    <div className="flex flex-col">
                      {session.user.username && (
                        <Link
                          className="cursor-pointer text-sm"
                          href={`/${session.user.username}`}
                        >
                          <div className="rounded-md px-2 py-2 text-sm hover:bg-secondary">
                            <div className="justify-left flex items-center">
                              <span className="inline-block">
                                <User size={15} className="mr-2 text-primary" />
                              </span>
                              <span className="font-semibold">
                                View my page
                              </span>
                            </div>
                          </div>
                        </Link>
                      )}
                      <Link
                        className="cursor-pointer text-sm"
                        href="/account/dashboard"
                      >
                        <div className="rounded-md px-2 py-2 text-sm hover:bg-gray-100 hover:bg-secondary">
                          <div className="justify-left flex items-center">
                            <span className="inline-block">
                              <Newspaper
                                size={15}
                                className="mr-2 text-primary"
                              />
                            </span>
                            <span>Dashboard</span>
                          </div>
                        </div>
                      </Link>
                      <Link className="cursor-pointer text-sm" href="/explore">
                        <div className="rounded-md px-2 py-2 text-sm hover:bg-gray-100 hover:bg-secondary">
                          <div className="justify-left flex items-center">
                            <span className="inline-block">
                              <Search size={15} className="mr-2 text-primary" />
                            </span>
                            <span>Explore creators</span>
                          </div>
                        </div>
                      </Link>
                      <Link
                        className="cursor-pointer text-sm"
                        href="/account/profile"
                      >
                        <div className="rounded-md px-2 py-2 text-sm hover:bg-gray-100 hover:bg-secondary">
                          <div className="justify-left flex items-center">
                            <span className="inline-block">
                              <Settings2
                                size={15}
                                className="mr-2 text-primary"
                              />
                            </span>
                            <span>My account</span>
                          </div>
                        </div>
                      </Link>
                      <div
                        onClick={() => signOut()}
                        className="cursor-pointer rounded-md px-2 py-2 text-sm text-primary hover:bg-secondary hover:text-gray-900"
                      >
                        <div className="justify-left flex items-center text-muted-foreground hover:text-primary">
                          <span className="inline-block">
                            <LogOut size={15} className="mr-2" />
                          </span>
                          <span className="">Logout</span>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="flex items-center justify-center">
                <Link
                  href="/account/login"
                  className="text-md h-auto rounded-full bg-sky-500 px-4 py-2 font-bold text-white transition duration-150 hover:bg-sky-400"
                >
                  Log In
                </Link>
              </div>
            </Fragment>
          )}
        </nav>
      </MainLayout>
    </div>
  );
};
