"use client";

import type * as React from "react";
import { User, LogOut, Store, Workflow } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuButton,
} from "@linktra/components/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@linktra/components/dropdown-menu";
import { BusinessNavigationWorkspace } from "./navigation/workspace";
import { useQuery } from "convex/react";
import { api } from "@linktra/backend/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import BusinessNavigationChannels from "./navigation/channels";

export function BusinessSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { signOut } = useAuth();
  const store = useQuery(api.auth.getCurrentUserStore);

  return (
    <Sidebar className="border-r border-zinc-100" {...props}>
      <SidebarHeader className="py-0 px-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size={"sm"}
              className="w-full h-11 rounded-none py-0 hover:cursor-pointer justify-between"
            >
              <div className="flex px-1.5 items-center gap-2 rounded-none">
                <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-white border border-slate-200 shadow-fade">
                  <Store className="h-4 w-4 text-slate-600" />
                </div>
                <div className="flex flex-col space-y-0 items-start text-left">
                  {store ? (
                    <span className="text-sm font-medium">{store?.name}</span>
                  ) : (
                    <div className="w-full h-1.5 bg-slate-100 rounded-sm animate-pulse"></div>
                  )}
                  <span className="text-xs text-slate-500">
                    Business Account
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px] ml-2">
            <DropdownMenuItem>
              <Workflow className="mr-2 h-4 w-4" />
              <span className="text-sm font-sans hover:cursor-pointer">
                Integrations
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span className="text-sm font-sans hover:cursor-pointer">
                Your Profile
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => signOut({ redirectUrl: "/sign-in" })}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span className="text-sm font-sans hover:cursor-pointer">
                Log Out
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
        <BusinessNavigationWorkspace />
        <BusinessNavigationChannels />
      </SidebarContent>
    </Sidebar>
  );
}
