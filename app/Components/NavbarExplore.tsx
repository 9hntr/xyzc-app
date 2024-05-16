import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { Navbar } from "./Navbar";

export const NavbarExplore = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollingUp(false);
      } else {
        setScrollingUp(true);
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <Transition
      show={scrollingUp}
      enter="transition-transform duration-500"
      enterFrom="translate-y-0"
      enterTo="-translate-y-full"
    >
      <Navbar />
    </Transition>
  );
};
