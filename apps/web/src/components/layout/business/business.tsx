import { SidebarProvider } from "@linktra/components/sidebar";
import { BusinessSidebar } from "./sidebar";

interface BusinessLayoutProps {
  children: React.ReactNode;
  header: React.ReactNode;
}

export default async function BusinessLayout({
  children,
  header,
}: BusinessLayoutProps) {
  return (
    <SidebarProvider className="bg-zinc-50">
      <BusinessSidebar />
      <div className="h-svh overflow-hidden bg-white w-full">
        <div className="overflow-hidden flex flex-col items-center justify-start h-full w-full">
          {header}
          <div className="w-full overflow-auto">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
