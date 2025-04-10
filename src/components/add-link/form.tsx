"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";

export function AddLinkForm() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) return;

    setIsLoading(true);

    try {
      setUrl("");
      await setTimeout(() => console.log("result"), 2000); // simulate
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error parsing link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isFormOpen) {
    return (
      <Button
        onClick={() => setIsFormOpen(true)}
        className="w-full mt-6 group"
        variant="outline"
      >
        <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
        Add New Link
      </Button>
    );
  }

  return (
    <Card className="mt-6 border-dashed">
      <CardHeader>
        <CardTitle className="text-lg">Add New Link</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground mt-2">
            AI will automatically parse the link to generate title, description,
            and theme
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsFormOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={!url || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              "Add Link"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
