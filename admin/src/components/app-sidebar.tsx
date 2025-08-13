"use client"

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  MessageCircle,
  SquareTerminal,
  Settings2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
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
      title: "Users & Access",
      url: "/users",
      icon: Bot,
      items: [
        { title: "Users", url: "/users" },
        { title: "Invites", url: "/users/invites" },
        { title: "Roles & Permissions", url: "/users/roles" },
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
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
