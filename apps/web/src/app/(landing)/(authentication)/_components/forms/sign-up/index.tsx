"use client";

import { Label } from "@linktra/components/label";
import { Input } from "@linktra/components/input";
import { Button } from "@linktra/components/button";
import { useSignUp } from "@clerk/nextjs";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from "../validation";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const router = useRouter();

  const { isLoaded, setActive, signUp } = useSignUp();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const [, setErrors] = useState<ClerkAPIError[]>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (v: SignUpType) => {
    setErrors(undefined);
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const attempt = await signUp.create({
        emailAddress: v.email,
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
        <Label>E-mail</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
        />
      </div>
      <div className="space-y-2 flex flex-col">
        <Label>Password</Label>
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
