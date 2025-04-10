"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles } from "lucide-react";

type AddLinkDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
interface ParsedLink {
  title: string;
  description: string;
  thumbnail: string | null;
  theme: string;
  category: string;
}
async function parseLink(url: string): Promise<ParsedLink> {
  // In a real implementation, you would:
  // 1. Fetch the webpage content
  // 2. Use AI to analyze the content
  // 3. Return the parsed data

  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: "Auto-generated Title for " + url,
        description: "AI-generated description for this link",
        thumbnail: "/placeholder.svg?height=200&width=300",
        theme: "#7928CA",
        category: "Dubai",
      });
    }, 1500);
  });
}

export function AddLinkDialog({ open, onOpenChange }: AddLinkDialogProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<ParsedLink | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsLoading(true);
    setAiResult(null);

    try {
      const parsedLink = await parseLink(url);
      setAiResult(parsedLink);
    } catch (error) {
      console.error("Error parsing link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    console.log("Saving link:", { url, ...aiResult });
    setUrl("");
    setAiResult(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-500" />
            Add with AI
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="url">Paste any URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                AI will analyze the link and generate a beautiful card
              </p>
            </div>

            {isLoading && (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
                <p className="text-sm font-medium">
                  AI is analyzing your link...
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Extracting title, description, and generating a theme
                </p>
              </div>
            )}

            {aiResult && (
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-100 dark:border-purple-800">
                <h3 className="font-medium mb-2">AI Analysis Result</h3>
                <div className="grid gap-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Title:
                    </span>
                    <span className="font-medium">{aiResult.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Description:
                    </span>
                    <span className="font-medium line-clamp-1">
                      {aiResult.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">
                      Theme:
                    </span>
                    <div
                      className="h-4 w-16 rounded-full"
                      style={{
                        background: aiResult.theme.includes("gradient")
                          ? aiResult.theme.replace("bg-", "")
                          : aiResult.theme,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex justify-between sm:justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            {!aiResult ? (
              <Button type="submit" disabled={!url || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </Button>
            ) : (
              <Button type="button" onClick={handleSave}>
                Save Link
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
