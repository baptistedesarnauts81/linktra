import { SidebarProvider } from "@linktra/components/sidebar";
import { BusinessSidebar } from "./sidebar";
import Preview from "@/components/preview";

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
        <div className="overflow-hidden flex flex-col items-center space-y-0 px-0 justify-start h-full w-full">
          <div className="w-full overflow-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-8">
                {header}
                <div className="w-full overflow-auto">{children}</div>
              </div>
              <Preview />
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
