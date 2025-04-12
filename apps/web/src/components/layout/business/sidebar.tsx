"use client";

import {
  Box,
  ContactRound,
  FolderKanban,
  Inbox,
  UserRound,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@linktra/components/sidebar";
import { BusinessNavigationWorkspace } from "./navigation/workspace";

const data = {
  inbox: [
    {
      name: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      name: "My issues",
      url: "#",
      icon: FolderKanban,
    },
  ],
  workspace: [
    {
      name: "Teams",
      url: "/lndev-ui/teams",
      icon: ContactRound,
    },
    {
      name: "Projects",
      url: "/lndev-ui/projects",
      icon: Box,
    },
    {
      name: "Members",
      url: "/lndev-ui/members",
      icon: UserRound,
    },
  ],
};

export function BusinessSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r border-slate-200" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <BusinessNavigationWorkspace />
      </SidebarContent>
    </Sidebar>
  );
}
