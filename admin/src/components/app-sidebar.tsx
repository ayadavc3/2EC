"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
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
      url: "/admin/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Overview", url: "/admin/dashboard" },
        { title: "System Health", url: "/admin/dashboard/health" },
      ],
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: BabyIcon,
      items: [
        { title: "Students", url: "/admin/students" },
        { title: "Invites", url: "/admin/students/invites" },
      ],
    },
    {
      title: "Guardians",
      url: "/admin/guardians",
      icon: UsersIcon,
      items: [
        { title: "Guardians", url: "/admin/guardians" },
        { title: "Invites", url: "/admin/guardians/invites" },
      ],
    },
    {
      title: "Groups",
      url: "/groups",
      icon: BookOpen,
      items: [
        { title: "Groups", url: "/admin/groups" },
        { title: "Members", url: "/admin/groups/members" },
        { title: "Moderation Rules", url: "/admin/groups/moderation" },
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
      url: "/admin/audit",
      icon: Command,
    },
    {
      title: "Admin",
      url: "/admin/users",
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
        <SignedIn>
          <UserButton />
        </SignedIn>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
