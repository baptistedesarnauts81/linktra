import { getCurrentUserStore } from "@/lib/convex/organizations";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const user = await getCurrentUserStore();
  //if (user) redirect("/dashboard");

  return <div>{children}</div>;
}
