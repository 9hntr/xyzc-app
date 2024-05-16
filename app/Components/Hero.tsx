"use client";

import Link from "next/link";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { MainLayout } from "@/app/Layouts/mainLayout";
import { siteConfig } from "@/siteConfig";
import { useRouter } from "next/navigation";
import { BtnMadeBy } from "./BtnMadeBy";

export const Hero = () => {
  const router = useRouter();
  const inputClaimUsername = useRef() as MutableRefObject<HTMLInputElement>;
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [username, setUsername] = useState<string>("");

  const hdlFocus = () => {
    inputClaimUsername.current.focus();
    setIsInputFocused(true);
  };

  const handleBlur = () => setIsInputFocused(false);

  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Enter" && isInputFocused)
        router.push(`/account/register?username=${username}`);
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isInputFocused, router, username]);

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <MainLayout>
        <div className="relative flex flex-col items-center justify-center pt-40">
          <div className="mb-10 flex w-4/5 flex-col items-center justify-center">
            <Link href={siteConfig.exLinks.githubProfile} target="_blank">
              <BtnMadeBy />
            </Link>
            <h1 className="mb-2 bg-gradient-to-r from-sky-400 via-blue-300 to-pink-300 bg-clip-text pb-2 text-center text-2xl font-extrabold text-transparent md:text-6xl">
              All you need to make money doing what you love
            </h1>
            <p className="text-md text-center text-gray-600 md:text-lg">
              Join now and start getting donations
            </p>
          </div>

          <div
            onClick={hdlFocus}
            className="transform rounded-full bg-secondary px-4 py-2 drop-shadow-lg transition duration-300 hover:scale-110"
          >
            <span className="select-none text-xs font-bold text-primary md:text-lg">
              {siteConfig.domain}
            </span>
            <input
              value={username}
              onBlur={handleBlur}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              ref={inputClaimUsername}
              type="text"
              placeholder="yoursite"
              className="w-[80px] border-none bg-transparent text-sm text-primary outline-none focus:outline-none md:text-lg lg:w-[140px]"
            />
            <Link
              href={{
                pathname: "/account/register",
                query: { username },
              }}
            >
              <button className="ml-4 rounded-3xl bg-sky-500 px-4 py-1 text-xs font-semibold text-white transition duration-150 hover:bg-sky-400 md:text-lg">
                Claim
              </button>
            </Link>
          </div>
          <span className="mt-4 text-sm text-muted-foreground">
            It&apos;s free and takes less than a minute!
          </span>
        </div>
      </MainLayout>
    </div>
  );
};
