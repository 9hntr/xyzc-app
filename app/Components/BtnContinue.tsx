import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const BtnContinue = ({ loading }: { loading: boolean }) => {
  return (
    <Button
      variant="default"
      type="submit"
      className="flex w-full items-center justify-center rounded-xl px-4 py-4 font-semibold text-white dark:bg-background dark:text-primary dark:hover:bg-card"
    >
      <span className="mr-2 text-lg font-semibold">Continue</span>
      {loading ? <LoadingSpinner size={3} /> : <ArrowRight size={20} />}
    </Button>
  );
};
