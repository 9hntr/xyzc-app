import type { Metadata } from "next";
import { Footer } from "@/app/Components/Footer";
import { Navbar } from "@/app/Components/Navbar";
import { User } from "./User";
import { siteConfig } from "@/siteConfig";

export async function generateMetadata({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> {
  const ogUrl = new URL(`${siteConfig.apiUrl}/user/og?username=${username}`);

  return {
    title: `Support ${username} on ${siteConfig.appName}! ❤️`,
    openGraph: {
      images: [
        {
          url: ogUrl.toString(),
        },
      ],
    },
  };
}

const UserPage = ({
  params: { username },
}: {
  params: { username: string };
}) => {
  return (
    <div className="relative h-[40vh] w-full">
      <Navbar floating={true} />
      <User username={username} />
      <Footer />
    </div>
  );
};

export default UserPage;
