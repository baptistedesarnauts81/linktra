"use server";

import SetupForm from "./_components/forms/setup";

export default async function SetupPage() {
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
