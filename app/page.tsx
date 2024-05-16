"use server";

import { Navbar } from "./Components/Navbar";
import { Hero } from "./Components/Hero";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Footer } from "./Components/Footer";
import { HomeCarousel } from "./home/HomeSlider";
import { authOptions } from "@/lib/nextAuth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) redirect(`/explore`);

  return (
    <div className="content">
      <Navbar />
      <Hero />
      <HomeCarousel />
      <Footer />
    </div>
  );
}
