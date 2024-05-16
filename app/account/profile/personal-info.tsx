import React, { useState } from "react";
import { Category, User } from "@/types";
import { useForm } from "react-hook-form";
import { updateUserPersonalSchema } from "@/validations/user.schema";
import { updateUser } from "@/app/api-hooks";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Media } from "./media";
import { siteConfig } from "@/siteConfig";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Info, X } from "lucide-react";
import { FormInput } from "@/app/Components/FormInput";
import { BtnSaveSettings } from "@/app/Components/BtnSaveSettings";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { EditSocials } from "./editSocials";

type UserFormData = z.infer<typeof updateUserPersonalSchema>;

export const PersonalInfo = ({
  user,
  categories,
  refetchUser,
}: {
  user: User;
  categories: Category[];
  refetchUser: any;
}) => {
  const [displayBanner, setDisplayBanner] = useState<boolean>(() => {
    if (!user?.about || !user?.name) return true;
    else return false;
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    user?.categories?.map((i) => i.title) ?? []
  );
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const form = useForm<UserFormData>({
    defaultValues: user,
    resolver: zodResolver(updateUserPersonalSchema),
  });

  const { mutate: updateUserData, isPending: updateUserDataPending } =
    useMutation({
      mutationFn: (data: any) => updateUser(data),
      onSuccess: (user) => {
        setSubmitDisabled(false);
        toast("", {
          description: "User updated successfully.",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      },
      onError: (error: any) => {
        console.log("file: personal-info.tsx:53 ⌿ error* ", error);
        toast(error as string, {
          description: "",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      },
    });

  const onSubmit = async (data: any) => {
    try {
      updateUserData({
        ...data,
        categories: selectedCategories,
      });
    } catch (error: any) {
      console.log("file: personal-info.tsx:70 ⌿ onSubmit ⌿ error* ", error);
    }
  };

  return (
    <div className="relative mb-8 mt-4 w-full px-6 pb-6">
      <Media user={user} refetchUser={refetchUser} />

      <p className="mb-6 text-lg font-semibold text-primary">About me</p>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          tooltipContent={`You can use your real name or an alternative one. This will be displayed on your page. You can change it at any time.`}
          type="text"
          formId="name"
          formhdl={form}
          title="Display name"
          placeholder="Your name"
          id="name"
        />

        <FormInput
          tooltipContent={`Claim your page. E.g. ${siteConfig.domain}[username]`}
          type="fixed:text"
          formId="username"
          formhdl={form}
          title="Username"
          placeholder="Username"
          id="username"
          fixedText="@"
        />

        <span className="mb-6 mt-[-8px] block text-xs text-muted-foreground">
          Your page will be available on {siteConfig.domain}[username]
        </span>

        <FormInput
          tooltipContent="Where can people find you on the web? Safe-for-work links only!"
          type="text"
          formId="mainUrl"
          formhdl={form}
          title="Website"
          placeholder="Your website or linktree URL"
          id="mainUrl"
        />

        <EditSocials socials={user?.socials ?? []} />

        <div className="mb-6">
          <label
            htmlFor="Interests"
            className="mt-4 block text-sm font-semibold"
          >
            Interests
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Info
                    size={13}
                    className="mb-1 ml-1.5 inline-block text-muted-foreground"
                  />
                </TooltipTrigger>
                <TooltipContent className="w-auto text-center">
                  <p className="text-xs font-normal">
                    Choose up to 4 tags. This helps people discover your page.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>

          <Select
            onValueChange={(title: string) => {
              if (selectedCategories.includes(title)) {
                const update = selectedCategories.filter((i) => i !== title);
                setSelectedCategories(update);
              } else {
                setSelectedCategories([...selectedCategories, title]);
              }
            }}
          >
            <div className="mt-2 flex w-full flex-wrap rounded-xl py-1 outline-none dark:bg-background">
              {selectedCategories.length === 0
                ? null
                : selectedCategories.map((category, idx) => (
                    <div
                      key={idx}
                      className="my-1 mr-1 flex flex-wrap items-center justify-center rounded-full border-2 border-slate-300 px-4 py-1 text-xs font-semibold text-slate-500 dark:border-secondary md:my-0 md:text-sm"
                    >
                      {category}
                      <X
                        size={18}
                        className="z-10 ml-2 cursor-pointer text-gray-400 hover:text-gray-700"
                        onClick={() => {
                          const update = selectedCategories.filter(
                            (i) => i !== category
                          );
                          setSelectedCategories(update);
                        }}
                      />
                    </div>
                  ))}
              {selectedCategories.length === 4 ? null : (
                <SelectTrigger className="w-auto rounded-full border-2 border-slate-400 bg-transparent dark:border-secondary">
                  <span className="my-1 mr-2 text-xs font-semibold text-slate-500 md:my-0 md:text-sm">
                    Add category
                  </span>
                </SelectTrigger>
              )}
            </div>

            <SelectContent align="end" className="p-0">
              {categories &&
                categories.map(({ title }, idx: number) => (
                  <SelectItem className="px-2 py-1" key={idx} value={title}>
                    {title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <FormInput
          tooltipContent="Set an amount you want to achieve e.g. 250. The progress will be shown in your profile."
          type="fixed:number"
          formId="goalAmount"
          formhdl={form}
          title="Goal"
          placeholder="e.g. 250"
          id="goalAmount"
          fixedText="$"
        />

        <div className="mb-6">
          <label htmlFor="about" className="mt-4 block text-sm font-semibold">
            About you
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <Info
                    size={13}
                    className="mb-1 ml-1.5 inline-block text-muted-foreground"
                  />
                </TooltipTrigger>
                <TooltipContent className="w-auto text-center">
                  <p className="text-xs font-normal">
                    Introduce yourself. Tell people about what you do in a few
                    lines. This also helps people discover your content.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </label>
          <textarea
            id="about"
            maxLength={1000}
            spellCheck={false}
            className="mt-2 flex max-h-36 min-h-20 w-full items-center justify-center rounded-xl border-2 border-gray-100 bg-secondary px-4 py-2 text-muted-foreground outline-none focus-within:border-gray-200 focus-within:bg-white hover:border-gray-200 dark:border-secondary dark:bg-background dark:focus-within:bg-secondary"
            placeholder="Tell about yourself in a few words"
            {...form.register("about")}
          />
        </div>

        <BtnSaveSettings
          disabled={submitDisabled}
          loading={updateUserDataPending}
        />
      </form>

      {displayBanner && (
        <div className="fixed bottom-6 flex w-full">
          <div className="z-10 flex items-center justify-center rounded-lg bg-white px-6 py-4 drop-shadow-xl">
            <span>
              To make your page public, please make sure to fill up your profile
              information
            </span>
            <X
              size={20}
              onClick={() => setDisplayBanner(false)}
              className="ml-4 cursor-pointer font-semibold"
            />
          </div>
        </div>
      )}
    </div>
  );
};
