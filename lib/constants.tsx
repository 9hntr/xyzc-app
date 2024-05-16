import { X } from "@/app/Components/icons/X";
import { Facebook } from "@/app/Components/icons/Facebook";
import { Instagram, Github, Youtube, Twitter } from "lucide-react";

export const singleCoffeePrice = 5;
export const categories = [
  "Medicine",
  "In memoriam",
  "Emergency",
  "NGO",
  "Education",
  "Animals",
  "Environment",
  "Business",
  "Community",
  "Competition",
  "Creative Arts",
  "Event",
  "Religion",
  "Family",
  "Sports",
  "Travel",
  "Volunteering",
  "Wishes",
];

const defaultIconStyle =
  "w-5 h-5 text-muted-foreground hover:text-primary transition duration-150";
export const socialLinks: any = {
  instagram: {
    title: "Instagram",
    icon: <Instagram className={defaultIconStyle} />,
    tooltipText: "Your Instagram username",
    urlPrefix: "https://instagram.com/",
  },
  facebook: {
    title: "Facebook",
    icon: <Facebook className={defaultIconStyle} />,
    tooltipText: "Your Facebook username",
    urlPrefix: "https://www.facebook.com/",
  },
  x: {
    title: "X",
    icon: (
      <X className="h-4 w-4 text-muted-foreground transition duration-150 hover:text-primary" />
    ),
    tooltipText: "Your X username",
    urlPrefix: "https://twitter.com/",
  },
  github: {
    title: "Github",
    icon: <Github className={defaultIconStyle} />,
    tooltipText: "Your Github username",
    urlPrefix: "https://github.com/",
  },
  youtube: {
    title: "Youtube",
    icon: (
      <Youtube className="h-7 w-7 text-muted-foreground transition duration-150 hover:text-primary" />
    ),
    tooltipText: "Your Youtube channel name",
    urlPrefix: "https://www.youtube.com/@",
  },
};
