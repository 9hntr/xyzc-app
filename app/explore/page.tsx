import { MainLayout } from "@/app/Layouts/mainLayout";
import { Navbar } from "@/app/Components/Navbar";
import { Explore } from "./Explore";
import type { Metadata } from "next";
import { siteConfig } from "@/siteConfig";
import { Footer } from "@/app/Components/Footer";

export const metadata: Metadata = {
  title: `Explore Featured Creators on ${siteConfig.appName}!`,
};

const ExplorePage = ({
  searchParams: { category },
}: {
  searchParams: { category: string };
}) => {
  return (
    <div className="mt-[6rem] w-full">
      <Navbar />
      <MainLayout>
        <Explore category={category} />
      </MainLayout>
      <Footer />
    </div>
  );
};

export default ExplorePage;
