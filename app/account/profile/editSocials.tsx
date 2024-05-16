import React, { useState } from "react";
import { LinkIcon } from "lucide-react";
import { updateUserSocials } from "@/app/api-hooks";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSocialsSchema } from "@/validations/user.schema";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/lib/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormInput } from "@/app/Components/FormInput";
import { BtnSaveSettings } from "@/app/Components/BtnSaveSettings";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserSocials } from "@/types";

type SocialFormData = z.infer<typeof updateUserSocialsSchema>;

export const EditSocials = ({ socials }: { socials: UserSocials[] }) => {
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const formSocials = useForm<SocialFormData>({
    defaultValues: socials.reduce(
      (
        result: any,
        { platform, accountName }: { platform: string; accountName: string }
      ) => {
        result[platform] = accountName;
        return result;
      },
      {}
    ),
    resolver: zodResolver(updateUserSocialsSchema),
  });

  const { mutate: updateUser, isPending: updateUserDataPending } = useMutation({
    mutationFn: (data: any) => updateUserSocials(data),
    onSuccess: (user) => {
      setSubmitDisabled(false);
      toast("", {
        description: "Socials updated successfully.",
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

  const hdlSubmitSocials = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // Clear the search parameters from the URL
    const url = new URL(window.location.href);
    url.search = "";
    window.history.replaceState({}, document.title, url);

    try {
      const socials = formSocials.getValues();
      if (socials)
        updateUser({
          socials,
        });
    } catch (error: any) {
      console.log("file: personal-info.tsx:70 ⌿ onSubmit ⌿ error* ", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="my-2 rounded-2xl">
          <LinkIcon className="mr-2 inline-block h-4 w-4" />
          <span className="text-muted-foreground">Social links</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[485px]">
        <form onSubmit={hdlSubmitSocials} id="socials">
          <DialogHeader>
            <DialogTitle>Your social links</DialogTitle>
            <DialogDescription>
              Use xyzc as a linktree for all your socials!
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="items-left flex h-80 w-full flex-col py-4">
            <div className="w-[95%]">
              {Object.keys(socialLinks).map((name: string) => (
                <FormInput
                  key={name}
                  tooltipContent={socialLinks[name].tooltipText}
                  type="fixed:text"
                  formId={name}
                  formhdl={formSocials}
                  title={socialLinks[name].title}
                  placeholder=""
                  id={socialLinks[name].title}
                  fixedText="@"
                />
              ))}
            </div>
          </ScrollArea>
          <DialogFooter>
            <BtnSaveSettings
              disabled={submitDisabled}
              loading={updateUserDataPending}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
