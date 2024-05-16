import { Button } from "@/components/ui/button";
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";

export const BtnSaveSettings = ({
  loading,
  disabled,
}: {
  loading: boolean;
  disabled: boolean;
}) => {
  return (
    <Button
      variant="default"
      type="submit"
      disabled={disabled}
      className="mt-6 flex items-center justify-center rounded-lg px-8 text-xs"
    >
      {loading && (
        <span className="mr-2">
          <LoadingSpinner size={3} />
        </span>
      )}
      <span className="text-sm">Save settings</span>
    </Button>
  );
};
