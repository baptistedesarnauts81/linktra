"use client";

import usePreviewStore from "@/lib/store/preview";
import { Button } from "@linktra/components/button";
import { SidebarTrigger } from "@linktra/components/sidebar";
import { Eye, EyeOff } from "lucide-react";

export default function BusinessLayoutHeader() {
  const { preview, togglePreview } = usePreviewStore();
  return (
    <header className="w-full flex flex-col items-center border-b border-zinc-100">
      <div className="w-full flex justify-between items-center px-4 py-3">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="py-0 h-5 shadow-none"
            size="icon"
            onClick={togglePreview}
          >
            {preview ? <EyeOff size={17} /> : <Eye size={17} />}
          </Button>
        </div>
      </div>
    </header>
  );
}
