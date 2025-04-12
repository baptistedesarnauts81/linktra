"use client";

import { CalendarIcon, SettingsIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui/src/components/sidebar";

import Link from "next/link";

const workspace = [
  {
    name: "Appointments",
    url: "/events",
    icon: CalendarIcon,
  },
  {
    name: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

export function BusinessNavigationWorkspace() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="uppercase text-[.67rem] tracking-widest">
        Workspace
      </SidebarGroupLabel>
      <SidebarMenu>
        {workspace.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
