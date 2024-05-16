import React, { Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { User } from "@/types";
import Image from "next/image";
import { Check, Info, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { hdlUserPayment } from "@/app/api-hooks";
import { useMutation } from "@tanstack/react-query";
import { LoadingSpinner } from "@/app/Components/LoadingSpinner";
import { useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";

const defaultAmount: number = 1;

export const Support = ({
  user,
  countDonations,
  refetchUser,
}: {
  user: User | undefined;
  countDonations: number;
  refetchUser: any;
}) => {
  const [radioChecked, setRadioChecked] = useState<boolean>(false);
  const [messageFocused, setMessageFocused] = useState<boolean>(false);
  const { data: session } = useSession();
  const [amount, setAmount] = useState<number>(defaultAmount);
  const [pricePerCoffee] = useState<number>(5);
  const [supporterName, setSupporterName] = useState<string>("");
  const [supporterMessage, setSupporterMessage] = useState<string>("");

  const { mutate: processPayment, isPending: paymentProcessing } = useMutation({
    mutationFn: async () => {
      if (user?.id)
        return hdlUserPayment({
          targetId: user.id,
          amount: pricePerCoffee * amount,
          name: supporterName,
          message: supporterMessage,
        });
    },
    onSuccess: () => {
      setAmount(defaultAmount);
      setSupporterName("");
      setSupporterMessage("");
      refetchUser();
    },
  });

  const hdlSetAmount = (e: any) => {
    if (e.target.value.length > 3) return;

    const value = Number(e.target.value);
    if (isNaN(value)) return;

    setAmount(value);
  };

  const hdlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    processPayment();
  };

  const hdlMessageFocus = () => setMessageFocused(true);
  const hdlRadioChecked = () => {
    console.log("radioChecked", !radioChecked);
    setRadioChecked(!radioChecked);
  };

  return (
    <div
      className={`h-auto min-h-[27rem] w-full rounded-xl bg-background p-6 drop-shadow-md dark:bg-secondary`}
    >
      <div className="flex flex-col">
        {user?.goalAmount ? (
          <Fragment>
            <div className="text-md font-semibold">
              Buy {user.name} a coffee
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Info size={12} className="mb-1 ml-1.5 inline-block" />
                  </TooltipTrigger>
                  <TooltipContent className="w-auto text-center">
                    <p className="text-xs font-normal">Support {user?.name}</p>
                    <p className="text-xs font-normal">
                      You&apos;ll be taken to a &quot;thank you page&quot; after
                      the payment.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="mb-2 text-sm text-gray-600 dark:text-muted-foreground">
              <span className="mr-1 text-lg font-semibold text-gray-900 dark:text-primary">
                {user.totalProgress}%
              </span>
              raised from {user.goalAmount} $
              <Progress
                value={user.totalProgress}
                className="mt-2 h-2 bg-secondary dark:bg-background"
              />
            </div>

            <div className="my-2">
              {countDonations > 0 ? (
                <p className="text-sm text-gray-600 dark:text-muted-foreground">
                  <span className="mr-1">{countDonations}</span>
                  {countDonations > 1 || countDonations === 0
                    ? "contributions"
                    : "contribution"}{" "}
                  received
                </p>
              ) : (
                <p className="text-sm text-gray-600 dark:text-muted-foreground">
                  No contributions yet
                </p>
              )}
            </div>
          </Fragment>
        ) : (
          <div className="mb-2 space-y-3">
            <Skeleton className="h-4 w-2/3 rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200" />
            <Skeleton className="h-5 w-full rounded-md bg-gray-200" />
            <Skeleton className="h-4 w-1/3 rounded-md bg-gray-200" />
          </div>
        )}

        <div className="mb-2 flex flex-wrap items-center justify-center rounded-xl border-2 border-gray-200 py-2 dark:border-none md:px-4">
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
            className="mt-[-10px] h-12 w-12 object-cover md:h-14 md:w-14"
            alt=""
          />

          <X size={15} className="mx-1" />

          {[1, 3, 5].map((value: number, idx: number) => (
            <button
              key={idx}
              onClick={() => setAmount(value)}
              className={`ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-sky-200 p-4 text-sm font-semibold dark:border-sky-500 md:ml-4 ${
                amount === value
                  ? "bg-sky-300 text-white"
                  : "text-sky-300 hover:border-sky-300"
              }`}
            >
              {value}
            </button>
          ))}

          <input
            type="text"
            value={amount}
            onChange={hdlSetAmount}
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-lg border-2 border-sky-300 bg-sky-50 text-center text-sm font-semibold text-sky-300 focus:outline-none dark:bg-secondary dark:focus:bg-background md:ml-4"
          />
        </div>

        <form onSubmit={hdlSubmit}>
          <input
            type="text"
            maxLength={25}
            value={supporterName}
            onChange={(e) => setSupporterName(e.target.value)}
            placeholder="Name or @social"
            className="mt-2 flex w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background"
          />

          <textarea
            onFocus={hdlMessageFocus}
            value={supporterMessage}
            maxLength={200}
            placeholder="Say something nice"
            onChange={(e) => setSupporterMessage(e.target.value)}
            className="mt-2 flex max-h-36 min-h-20 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background"
          />

          {messageFocused && (
            <div className="mt-4 w-4/5">
              <input
                checked={radioChecked}
                onClick={hdlRadioChecked}
                id="privateMessage"
                type="radio"
                name="privateMessage"
                className="hidden"
              />
              <label
                htmlFor="privateMessage"
                className="flex cursor-pointer items-center"
              >
                <span
                  id="checkbox"
                  className={`ml-[2px] mr-2 flex h-5 w-5 items-center justify-center rounded-md border ${radioChecked ? "bg-sky-300" : "border-gray-300"}`}
                >
                  {radioChecked && (
                    <Check className="h-3 w-3 text-secondary dark:text-primary" />
                  )}
                </span>
                <span className="inline-block text-sm">
                  Make this message private
                </span>
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Info size={12} className="ml-1.5 inline-block" />
                    </TooltipTrigger>
                    <TooltipContent className="w-48 text-center">
                      <p className="text-xs font-normal">
                        The message will be visible to you and the creator only.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </label>
            </div>
          )}

          <Button
            disabled={!user || amount <= 0 || user.id === session?.user.id}
            type="submit"
            className="mt-6 flex w-full items-center justify-center rounded-full bg-sky-300 text-secondary transition duration-150 hover:bg-sky-400 dark:text-primary"
          >
            Support ${amount * pricePerCoffee}
            {paymentProcessing && (
              <span className="ml-2">
                <LoadingSpinner size={3} />
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
