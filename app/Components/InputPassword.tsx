import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

export const InputPassword = ({
  formhdl,
  formId,
  ...attrs
}: {
  formhdl: UseFormReturn<any>;
  formId: string;
  [key: string]: any;
}) => {
  const { register } = formhdl;
  const [displayInputValue, setDisplayInputValue] = useState<boolean>(false);

  return (
    <div className="mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background dark:focus-within:bg-secondary">
      <input
        type={displayInputValue ? "text" : "password"}
        spellCheck={false}
        className="w-full border-none bg-transparent outline-none"
        {...register(formId)}
        {...attrs}
      />
      {displayInputValue ? (
        <Eye
          onClick={() => setDisplayInputValue(false)}
          className="ml-2 cursor-pointer"
          size={20}
        />
      ) : (
        <EyeOff
          onClick={() => setDisplayInputValue(true)}
          className="ml-2 cursor-pointer"
          size={20}
        />
      )}
    </div>
  );
};
