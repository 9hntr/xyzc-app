import { useEffect, useState } from "react";

const useFixedSidebar = (scrollY: number, innerWidth: number = 0) => {
  const [fixSidebar, setFixSidebar] = useState(false);

  useEffect(() => {
    const handleFixSidebar = () => {
      if (window.scrollY >= scrollY && window.innerWidth >= innerWidth) {
        setFixSidebar(true);
      } else {
        setFixSidebar(false);
      }
    };

    window.addEventListener("scroll", handleFixSidebar);

    return () => {
      window.removeEventListener("scroll", handleFixSidebar);
    };
  }, [scrollY, innerWidth]);

  return fixSidebar;
};

export default useFixedSidebar;
