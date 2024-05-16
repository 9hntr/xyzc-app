"use client";

import { Check, ChevronDown, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Theme } from "@/types";

export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  const hdlSetTheme = (t: Theme) => {
    localStorage.setItem("theme", t);
    setTheme(t);
  };

  useEffect(() => {
    setIsMounted(true);

    const selectedTheme = localStorage.getItem("theme");
    if (selectedTheme) setTheme(selectedTheme);
  }, [setTheme]);

  if (theme && isMounted) {
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button className="px-3" variant="outline">
            <div className="flex flex-wrap items-center justify-center text-sm">
              {theme === "light" ? (
                <Sun className="h-3 w-3" />
              ) : theme === "dark" ? (
                <Moon className="h-3 w-3" />
              ) : null}
              <span className="ml-2 flex items-center justify-center">
                {theme && theme.charAt(0).toUpperCase() + theme.substring(1)}
                <ChevronDown className="ml-1.5 mt-0.5 h-3 w-3" />
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-xl" align="end">
          <DropdownMenuItem
            onClick={() => hdlSetTheme("light")}
            className="cursor-pointer rounded-lg"
          >
            <div className="flex items-center justify-center py-1">
              <Sun className="h-3 w-3" />
              <span className="ml-2">Light</span>
              {theme && theme === "light" && <Check className="ml-8 h-3 w-3" />}
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => hdlSetTheme("dark")}
            className="cursor-pointer rounded-lg"
          >
            <div className="flex items-center justify-center py-1">
              <Moon className="h-3 w-3" />
              <span className="ml-2">Dark</span>
              {theme && theme === "dark" && <Check className="ml-8 h-3 w-3" />}
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
