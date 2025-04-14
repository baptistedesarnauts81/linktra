"use server";

import { getCurrentUserStore } from "@/lib/convex/organizations";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();
  //const store = await getCurrentUserStore();

  if (!userId) return redirectToSignIn();
  //if (!store) redirect("/setup");

  return (
    <section className="grid grid-cols-12">
      <div className="col-span-8 flex flex-col justify-start items-start"></div>
      <div className="col-span-4"></div>
    </section>
  );
}
