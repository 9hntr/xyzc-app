"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/validations/auth.schema";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { UserRegister } from "@/types";
import { signup } from "@/app/api-hooks";
import { BtnGoogle } from "@/app/Components/BtnGoogle";
import Link from "next/link";
import { BtnContinue } from "@/app/Components/BtnContinue";
import { FormInput } from "@/app/Components/FormInput";

type FormData = z.infer<typeof registerSchema>;

const Login = () => {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const { mutate: signupUser, isPending: signupPending } = useMutation({
    mutationFn: (data: UserRegister) => signup(data),
    onSuccess: () => router.push("/account/profile"),
    onError: (err) => setError(err.message),
  });

  let form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: UserRegister) => signupUser(data);

  const handleGoogleSignIn = async () =>
    signIn("google", { callbackUrl: "/account/login" });

  useEffect(() => {
    if (session) router.push("/account/profile");
  }, [session, router]);

  useEffect(() => {
    if (window) {
      const url = new URL(window.location.href);
      const username = url.searchParams.get("username") ?? "";
      form.setValue("username", username);
    }
  }, [form]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white px-6 py-8 shadow-md dark:bg-secondary">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Let&apos;s get started!
        </h2>

        <div className="mt-4 flex justify-center">
          <BtnGoogle handleGoogleSignIn={handleGoogleSignIn} />
        </div>

        <div className="flex w-full select-none items-center justify-center">
          <div id="line" className="mr-4 mt-4 w-full border border-gray-100" />
          <p className="mt-4 text-center text-sm text-gray-400">OR</p>
          <div id="line" className="ml-4 mt-4 w-full border border-gray-100" />
        </div>

        {error && (
          <div className="my-4 rounded-md border border-red-300 bg-red-100 px-4 py-2 text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            type="text"
            formId="email"
            formhdl={form}
            title="Email"
            placeholder="Email Address"
            id="email"
          />
          <FormInput
            type="password"
            formId="password"
            formhdl={form}
            title="Password"
            placeholder="Set a Password"
            id="password"
          />
          <FormInput
            type="password"
            formId="confirmPassword"
            formhdl={form}
            title="Confirm Password"
            placeholder="Confirm your password"
            id="confirmPassword"
          />
          <FormInput
            type="text"
            formId="username"
            formhdl={form}
            title="Username"
            placeholder="What do want your link to be?"
            id="username"
          />
          <BtnContinue loading={signupPending} />
        </form>

        <p className="mt-6 text-center text-sm">
          Already a member?
          <span className="ml-1 text-sky-400 underline">
            <Link href="/account/login">Log in</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
