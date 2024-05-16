"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { MainLayout } from "@/app/Layouts/mainLayout";
import { Support } from "./support";
import { About } from "./about";
import { TopSupporters } from "./TopSupporters";
import { useQuery } from "@tanstack/react-query";
import {
  fetchDonationsByUsername,
  fetchProfileByUsername,
} from "@/app/api-hooks";

export const User = ({ username }: { username: string }) => {
  const [skipDonations, setSkipDonations] = useState<number>(0);

  const {
    data: user,
    isFetching: fetchingUser,
    refetch: refetchUser,
  } = useQuery({
    queryKey: [`user_${username}`],
    queryFn: () => fetchProfileByUsername(username),
  });

  const {
    data: donationsData,
    isFetching: fetchingDonations,
    refetch: refetchDonations,
  } = useQuery({
    queryKey: [`donations_${username}`],
    queryFn: () => fetchDonationsByUsername(username, skipDonations),
  });

  useEffect(() => {
    refetchDonations();
  }, [skipDonations, user, refetchDonations]);

  return (
    <Fragment>
      {user?.backgroundCover ? (
        <Image
          src={user?.backgroundCover}
          alt="Background Cover"
          layout="fill"
          objectFit="cover"
          quality={100}
          width={0}
          height={0}
          className="absolute left-0 top-0 h-auto w-full"
        />
      ) : (
        <div className="absolute left-0 top-0 flex h-[300px] w-full bg-gray-200"></div>
      )}
      <MainLayout>
        <div className="relative mb-8 grid grid-cols-1 gap-4 pt-[10rem] md:mx-16 xl:grid-cols-2">
          <div className="order-1">
            <About
              user={user}
              donations={donationsData?.donations}
              fetchingDonations={fetchingDonations}
              skipDonations={skipDonations}
              setSkipDonations={setSkipDonations}
            />
          </div>
          <div className="order-2 space-y-4">
            <Support
              user={user}
              countDonations={donationsData?.countDonations ?? 0}
              refetchUser={refetchUser}
            />

            <TopSupporters topSupporters={user?.topSupporters ?? null} />
          </div>
        </div>
      </MainLayout>
    </Fragment>
  );
};
