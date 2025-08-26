"use client";

import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  MessageCircle,
  SquareTerminal,
  BabyIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "ayadavc3",
    email: "ayadav@c3controls.com",
    avatar: "/avatars/ayadav.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
        { title: "System Health", url: "/dashboard/health" },
      ],
    },
    {
      title: "Students",
      url: "/students",
      icon: BabyIcon,
      items: [
        { title: "Students", url: "/students" },
        { title: "Invites", url: "/students/invites" },
      ],
    },
    {
      title: "Guardians",
      url: "/guardians",
      icon: UsersIcon,
      items: [
        { title: "Guardians", url: "/guardians" },
        { title: "Invites", url: "/guardians/invites" },
      ],
    },
    {
      title: "Groups",
      url: "/groups",
      icon: BookOpen,
      items: [
        { title: "Groups", url: "/groups" },
        { title: "Members", url: "/groups/members" },
        { title: "Moderation Rules", url: "/groups/moderation" },
      ],
    },
    {
      title: "Messaging",
      url: "/messaging",
      icon: MessageCircle,
    },
    {
      title: "Geolocation",
      url: "/geo",
      icon: Map,
    },
    {
      title: "Audit Log",
      url: "/audit",
      icon: Command,
    },
    {
      title: "Admin",
      url: "/admin",
      icon: Frame,
    },
  ],
  projects: [
    {
      name: "Docs & Guides",
      url: "#",
      icon: Frame,
    },
    {
      name: "Support",
      url: "#",
      icon: PieChart,
    },
    {
      name: "About",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <Separator />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
