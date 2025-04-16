import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTrackingUrl(userId: string, linkId: string): string {
  // For production, you might have a shorter domain for tracking
  return `/redirect/${linkId}?uid=${encodeURIComponent(userId)}`;
}
