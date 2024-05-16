"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/validations/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BtnGoogle } from "@/app/Components/BtnGoogle";
import { siteConfig } from "@/siteConfig";
import { BtnContinue } from "@/app/Components/BtnContinue";
import { FormInput } from "@/app/Components/FormInput";

const Login = () => {
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: siteConfig.testingCredentials.email,
      password: siteConfig.testingCredentials.password,
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = form.handleSubmit(async (data: any) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      setIsLoading(false);
      setError("Username and/or password incorrect");
    } else {
      router.push("/account/profile");
    }
  });

  const handleGoogleSignIn = () =>
    signIn("google", { callbackUrl: "/account/login" });

  useEffect(() => {
    if (session) router.push("/account/profile");
  }, [session, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white px-6 py-8 shadow-md dark:bg-secondary">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Welcome back.
        </h2>

        <div className="mt-4">
          <div className="flex justify-center">
            <BtnGoogle handleGoogleSignIn={handleGoogleSignIn} />
          </div>
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

        <form onSubmit={onSubmit}>
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
            placeholder="Your password"
            id="password"
          />
          <BtnContinue loading={isLoading} />
        </form>

        <p className="mt-6 text-center text-sm">
          Don&apos;t have an account yet?
          <span className="ml-1 text-sky-400 underline">
            <Link href="/account/register">Sign up for free</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
