"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SetupSchema, SetupSchemaType } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@linktra/components/input";
import { Button } from "@linktra/components/button";
import { CheckCircle2, Loader2, MoveRight } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, useMutation } from "convex/react";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@linktra/backend/convex/_generated/api";

export default function SetupForm() {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(SetupSchema),
  });
  const [checking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const username = watch("username");
  const createUsername = useMutation(api.organizations.createStore);
  const checkUsername = useQuery(api.organizations.getOrganizationByUsername, {
    username: username,
  });

  const usernameIsTaken = useDebouncedCallback(async (name: string) => {
    if (!name || name.length < 4) {
      setIsAvailable(false);
      return;
    }

    setIsChecking(true);
    setIsAvailable(false);
    try {
      if (!checkUsername) {
        setIsChecking(false);
        setIsAvailable(true);
      }
    } catch {
      setIsAvailable(false);
    } finally {
      setTimeout(() => setIsChecking(false), 2000);
    }
  }, 500);

  useEffect(() => {
    if (username) {
      usernameIsTaken(username);
      setIsChecking(false);
    } else {
      setIsChecking(false);
    }
    return () => usernameIsTaken.cancel();
  }, [username]);

  const onSubmit = async (v: SetupSchemaType) => {
    try {
      setIsLoading(true);
      const result = await createUsername({
        username: v.username,
        name: v.username,
      });
      if (result) {
        router.replace("/dashboard");
      }
    } catch {
      setIsLoading(false);
      toast.error("Something went wrong while setting up your account", {
        position: "bottom-center",
      });
    }
  };

  return (
    <form className="space-y-4 w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2 flex flex-col">
        <div className="flex relative">
          <div className="flex shrink-0 items-center font-sans rounded-l-md bg-white px-3 text-base text-black outline-1 -outline-offset-1 outline-gray-950/10 sm:text-sm/6">
            linktr.ai /
          </div>
          <Input
            id="orgName"
            type="text"
            placeholder="acme-inc-252"
            className="-ml-px block w-full rounded-l-none grow rounded-r-md bg-white px-3 py-1.5"
            {...register("username")}
          />
          {checking && (
            <Loader2 className="text-gray-300 absolute right-2 w-4 h-4 top-[0.75rem] animate-spin" />
          )}
          {isAvailable && (
            <CheckCircle2 className="text-indigo-500 absolute right-2 w-5 h-5 top-[0.62rem]" />
          )}
        </div>
        <span className="text-xs text-gray-600 font-normal">
          This is your store live URL
        </span>
      </div>
      <Button
        variant={"default"}
        type="submit"
        disabled={!isAvailable || checking}
        className="flex flex-row w-full space-x-2 justify-center items-center"
      >
        <span>Continue</span>
        <MoveRight size={18} />
      </Button>
    </form>
  );
}
