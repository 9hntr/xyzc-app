import React from "react";
import { UseFormReturn } from "react-hook-form";
import { InputPassword } from "@/app/Components/InputPassword";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { InputFixed } from "./InputFixed";

export const FormInput = ({
  type = "text",
  fixedText = "",
  title,
  formId,
  formhdl,
  tooltipContent,
  ...attrs
}: {
  type: "text" | "password" | "fixed:number" | "fixed:text";
  fixedText?: string;
  title: any;
  formId: string;
  formhdl: UseFormReturn<any>;
  tooltipContent?: string;
  [key: string]: any;
}) => {
  const {
    register,
    formState: { errors, isValid },
  } = formhdl;

  const inputTypeMap = {
    password: <InputPassword formhdl={formhdl} formId={formId} {...attrs} />,
    text: (
      <input
        className="mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background dark:focus-within:bg-secondary"
        {...attrs}
        {...register(formId)}
      />
    ),
    "fixed:number": (
      <InputFixed
        fixedText={fixedText}
        formhdl={formhdl}
        formId={formId}
        type="number"
        {...attrs}
      />
    ),
    "fixed:text": (
      <InputFixed
        fixedText={fixedText}
        formhdl={formhdl}
        formId={formId}
        type="text"
        {...attrs}
      />
    ),
  };

  return (
    <div className="mb-4">
      <label htmlFor="email" className="mt-4 block text-sm font-semibold">
        {title}
        {tooltipContent && (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Info
                  size={13}
                  className="mb-1 ml-1.5 inline-block text-muted-foreground"
                />
              </TooltipTrigger>
              <TooltipContent className="w-auto text-center">
                <p className="text-xs font-normal">{tooltipContent}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </label>

      {inputTypeMap[type]}

      {errors[formId] && (
        <div className="mt-1 text-xs text-red-400">
          {errors[formId]?.message?.toString()}
        </div>
      )}
    </div>
  );
};
