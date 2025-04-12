import { SidebarTrigger } from "@/ui/src/components/sidebar";

export default function BusinessLayoutHeader() {
  return (
    <header className="w-full flex flex-col items-center border-b">
      <div className="w-full flex justify-between items-center px-4 py-3">
        <SidebarTrigger />
      </div>
    </header>
  );
}
