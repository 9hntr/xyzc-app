import React from "react";
import { UseFormReturn } from "react-hook-form";

export const InputFixed = ({
  formhdl,
  formId,
  fixedText,
  ...attrs
}: {
  formhdl: UseFormReturn<any>;
  formId: string;
  fixedText: string;
  [key: string]: any;
}) => {
  const { register } = formhdl;

  return (
    <div className="mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background dark:focus-within:bg-secondary">
      <span className="mr-2 select-none text-sm font-bold text-gray-600">
        {fixedText}
      </span>
      <input
        className="w-full border-none bg-transparent outline-none"
        spellCheck={false}
        {...register(formId)}
        {...attrs}
      />
    </div>
  );
};
