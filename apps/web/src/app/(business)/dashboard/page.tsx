import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId, orgSlug, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();
  if (!orgSlug?.length || orgSlug!.length <= 0) redirect("/setup");

  return <section></section>;
}
