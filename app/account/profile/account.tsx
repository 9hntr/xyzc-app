import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserAccountSchema } from "@/validations/user.schema";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { updateUser, deleteUser } from "@/app/api-hooks";
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
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { LoadingSpinner } from "@/app/Components/LoadingSpinner";
import { User } from "@/types";
import { BtnSaveSettings } from "@/app/Components/BtnSaveSettings";
import { FormInput } from "@/app/Components/FormInput";

type FormData = z.infer<typeof updateUserAccountSchema>;

export const Account = ({ user }: { user: User }) => {
  const [updatePasswordError, setUpdatePasswordError] = useState<string>();
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);
  const form = useForm<FormData>({
    defaultValues: {
      email: user.email,
    },
    resolver: zodResolver(updateUserAccountSchema),
  });

  const { mutate: updateUserData, isPending: updateUserDataPending } =
    useMutation({
      mutationFn: (data: any) => updateUser(data),
      onSuccess: () => {
        form.reset();
        setSubmitDisabled(false);
        toast("", {
          description: "Password updated successfully.",
          action: {
            label: "Close",
            onClick: () => {},
          },
        });
      },
    });

  const { mutate: deleteAccount, isPending: deleteAccountPending } =
    useMutation({
      mutationFn: () => deleteUser(),
      onSuccess: () => signOut(),
    });

  const onSubmit = (data: any) => {
    try {
      setSubmitDisabled(true);
      updateUserData(data);
    } catch (error) {
      let errorMessage = "Something went wrong";
      if (error instanceof Error) errorMessage = error.message;

      setUpdatePasswordError(errorMessage);
    }
  };

  return (
    <div className="w-full px-6">
      <p className="mb-6 pt-2 text-lg font-semibold text-primary">
        Account settings
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          formId="email"
          formhdl={form}
          title="Email"
          placeholder="Email"
          id="email"
        />

        <FormInput
          type="password"
          formId="password"
          formhdl={form}
          title="New password"
          placeholder=""
          id="password"
        />

        <FormInput
          type="password"
          formId="confirmPassword"
          formhdl={form}
          title="Confirm Password"
          placeholder=""
          id="confirmPassword"
        />

        {updatePasswordError && (
          <div className="my-4 rounded-md border border-red-300 bg-red-100 px-4 py-2 text-red-600">
            {updatePasswordError}
          </div>
        )}

        <BtnSaveSettings
          disabled={submitDisabled}
          loading={updateUserDataPending}
        />
      </form>

      <div className="mt-20 flex w-full flex-col rounded-2xl bg-background md:flex-row">
        <div className="justify-left items-left flex w-full flex-col md:w-3/5">
          <p className="font-semibold">Delete your account</p>
          <p className="mt-2 text-sm text-gray-600">
            Your account, along with all associated data and payout information,
            will be permanently deleted and cannot be restored.
          </p>
        </div>
        <div className="mt-4 flex w-full items-center justify-center md:w-2/5">
          <Dialog>
            <DialogTrigger>
              <div className="ml-auto w-full rounded-3xl border-2 border-red-500 px-6 py-2 text-center text-sm font-semibold text-red-500 md:w-auto">
                Delete my account
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-full md:max-w-xs">
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. We&apos;ll delete your account
                  and your data permanently from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-start">
                <Button
                  disabled={true}
                  onClick={() => deleteAccount()}
                  type="button"
                  variant="default"
                  className="rounded-lg text-xs"
                >
                  {deleteAccountPending && (
                    <span className="mr-2">
                      <LoadingSpinner size={3} />
                    </span>
                  )}

                  <span className="text-sm">Confirm</span>
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg text-sm"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
