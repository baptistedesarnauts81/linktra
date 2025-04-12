"use server";

import { getCurrentUserStore } from "@/lib/convex/organizations";
import { auth } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();
  const store = getCurrentUserStore();

  if (!userId) return redirectToSignIn();
  if (!store) redirect("/setup");

  return <section></section>;
}
