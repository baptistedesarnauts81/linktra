"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { AddLinkDialog } from "./dialog";

export function AddLinkButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="icon"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      <AddLinkDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
