"use client";

import { Label } from "@linktra/components/label";
import { Input } from "@linktra/components/input";
import { Button } from "@linktra/components/button";
import { useSignIn } from "@clerk/nextjs";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, SignInType } from "../validation";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();

  const { isLoaded, setActive, signIn } = useSignIn();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [, setErrors] = useState<ClerkAPIError[]>();

  const onSubmit = async (v: SignInType) => {
    setErrors(undefined);
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const attempt = await signIn.create({
        identifier: v.email,
        password: v.password,
      });

      if (attempt.status === "complete") {
        await setActive({ session: attempt.createdSessionId });
        router.push("/dashboard");
      }
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        toast.error(error.errors[0]?.message, {
          description: error.errors[0]?.longMessage,
          position: "bottom-center",
        });
        setErrors(error.errors);
      }
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 flex flex-col">
        <Label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          E-mail
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </Label>
        <Input id="password" type="password" {...register("password")} />
      </div>
      <Button
        variant={"default"}
        disabled={isLoading}
        loading={isLoading}
        type="submit"
        className="block w-full"
      >
        Get started for free
      </Button>
    </form>
  );
}
