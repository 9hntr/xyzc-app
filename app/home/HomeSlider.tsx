import React from "react";
import { MainLayout } from "../Layouts/mainLayout";
import { HomeSliderCard } from "./HomeSliderCard";

export const HomeCarousel = () => {
  const users = [
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714586079/fxfswuiirws5zq5oz2nh.webp",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714586104/bmgcmbolnebhqfsf8rp3.gif",
      username: "tofu",
      about:
        "All your support helps me create art without relying so heavily on commissions. Thank you so much. <3",
      categories: [{ title: "Community" }, { title: "Creative Arts" }],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714586204/symn8v4nzpsvrfeid0ci.jpg",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714586264/ukfe8cauazauj4qpafx0.jpg",
      username: "Mochi Buddies",
      about:
        "Planning to open a shop front in future! We will be saving money for the renovation, monthly rental and furnitures. Any amount of tips would be a big help! 🙏🏻",
      categories: [
        { title: "Drawing & painting" },
        { title: "Design" },
        { title: "Creative Arts" },
      ],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714591771/mcd4wt61mjsab2aoxbfl.gif",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714591755/copsn5xjonq7i77dd235.jpg",
      username: "jamie",
      about:
        "♡ they/them ♡ creator of Aphrodite bot on Discord ♡ artist, developer, and student",
      categories: [
        { title: "Music" },
        { title: "Podcast" },
        { title: "Streaming" },
      ],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714591985/eg86ie79gv2rvsfip54z.webp",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714591930/wm7zoylk4iegpdf5tbml.webp",
      username: "Eric Campbell",
      about:
        "After encouragement from community members and friends alike, I've started this goal to help me slay the great dragon in my life: Debt.",
      categories: [
        { title: "Writing" },
        { title: "Advice" },
        { title: "Streaming" },
      ],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714593023/emyjm7rtdccnz9jjm7im.jpg",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714592991/qvlw1yazkyzynn9qzegj.jpg",
      username: "Daylight Music",
      about:
        "Since 2009 Daylight Music has been an excuse to spend a lazy Saturday afternoon with music, tea & cake in North London. Produced and curated by Ben Eshmade (Arctic Circle).",
      categories: [{ title: "Music" }],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714593512/znurgegx6gaxdj2hhkq5.webp",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714593503/aboojfkon8nfhpsprk19.webp",
      username: "gatekid3",
      about:
        "I do art n' stuff. Specifically Pixel art and animation If you like what I do. maybe consider donating. I'd really appreciate it. Feel free to make suggestions if you ever donate. I'll end up doing ones I like so there's no harm in throwing stuff out there.",
      categories: [
        { title: "Animation" },
        { title: "Art" },
        { title: "Commisions" },
      ],
    },
    {
      backgroundCover:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714593397/zzgvzig1pnexd2ofiong.webp",
      avatar:
        "https://res.cloudinary.com/dijwbvhzb/image/upload/v1714593375/dswl9zak5zafq6bx8v6t.webp",
      username: "Board Game Blitz",
      about:
        "Board Game Blitz is a bi-weekly podcast about modern board games and card games hosted by Ambie and Crystal. We also stream regularly on Twitch and make YouTube videos about board games.",
      categories: [
        { title: "Video & Film" },
        { title: "Podcast" },
        { title: "Gaming" },
      ],
    },
  ];

  return (
    <div className="mt-20">
      <MainLayout>
        <div className="slider relative mx-8">
          <div className="slider-track gap-4">
            {[...users, ...users].map((user, idx: number) => (
              <HomeSliderCard user={user} key={idx} />
            ))}
          </div>
        </div>
      </MainLayout>
    </div>
  );
};
