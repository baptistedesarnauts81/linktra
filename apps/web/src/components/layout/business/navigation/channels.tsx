"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "@linktra/components/sidebar";
import { Plus } from "lucide-react";

export default function BusinessNavigationChannels() {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="uppercase text-[.67rem] tracking-widest">
        Channels
      </SidebarGroupLabel>
      <SidebarGroupAction title="Add Project">
        <Plus /> <span className="sr-only">Add Channel</span>
      </SidebarGroupAction>
    </SidebarGroup>
  );
}
