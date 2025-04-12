import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SetupForm from "./_components/forms/setup";

export default async function SetupPage() {
  const user = await auth();

  if (user.orgSlug?.length && user.orgSlug.length > 0) redirect("/dashboard");

  return (
    <main className="flex w-full flex-col justify-center items-center min-h-dvh">
      <div className="flex flex-col w-full max-w-[400px] justify-start items-start">
        <div className="text-pretty py-4 space-y-1.5">
          <h1 className="text-sm font-medium font-sans">
            Personalize your account
          </h1>
          <p className="text-gray-600 text-sm font-normal">
            Allows you to personalize your account with a custom booking link
            and description of your store for your customers
          </p>
        </div>
        <SetupForm />
      </div>
    </main>
  );
}
