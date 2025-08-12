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
  Settings2,
  SquareTerminal,
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
        { title: "MFA & Security", url: "/users/security" },
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
      icon: Settings2,
      items: [
        { title: "Compose / Schedule", url: "/messaging/compose" },
        { title: "Approvals Queue", url: "/messaging/approvals" },
        { title: "Outbox & History", url: "/messaging/history" },
        { title: "Templates", url: "/messaging/templates" },
        { title: "Attachments", url: "/messaging/attachments" },
      ],
    },
    {
      title: "Geolocation & Geofencing",
      url: "/geo",
      icon: Map,
      items: [
        { title: "Geofences", url: "/geo/geofences" },
        { title: "Live Monitoring", url: "/geo/live" },
        { title: "Entry/Exit Logs", url: "/geo/logs" },
        { title: "Device/Location Settings", url: "/geo/settings" },
        { title: "Vault (Location Data)", url: "/geo/vault" },
        { title: "Access Requests", url: "/geo/access-requests" },
        { title: "Access History", url: "/geo/access-history" },
      ],
    },
    {
      title: "Notifications",
      url: "/notifications",
      icon: PieChart,
      items: [
        { title: "Push Settings", url: "/notifications/push" },
        { title: "Delivery Log", url: "/notifications/delivery" },
        { title: "Preferences", url: "/notifications/preferences" },
      ],
    },
    {
      title: "Reports & Analytics",
      url: "/reports",
      icon: PieChart,
      items: [
        { title: "User Engagement", url: "/reports/user-engagement" },
        { title: "Message Analytics", url: "/reports/message-analytics" },
        { title: "Geolocation Compliance", url: "/reports/geolocation-compliance" },
        { title: "Group Metrics", url: "/reports/group-metrics" },
        { title: "Audit Logs (viewer)", url: "/reports/audit-logs" },
      ],
    },
    {
      title: "Audit & Compliance",
      url: "/audit",
      icon: Command,
      items: [
        { title: "Audit Log", url: "/audit/log" },
        { title: "User Data & Consent", url: "/audit/consent" },
        { title: "Data Export", url: "/audit/export" },
      ],
    },
    {
      title: "Organization",
      url: "/org",
      icon: Settings2,
      items: [
        { title: "Org Profile", url: "/org/profile" },
        { title: "Branding", url: "/org/branding" },
        { title: "Localization", url: "/org/localization" },
        { title: "Integrations", url: "/org/integrations" },
        { title: "API Keys / Secrets", url: "/org/api-keys" },
      ],
    },
    {
      title: "Admin",
      url: "/admin",
      icon: Frame,
      items: [
        { title: "Admins Management", url: "/admin/admins" },
        { title: "Billing", url: "/admin/billing" },
      ],
    },
    {
      title: "Help",
      url: "/help",
      icon: BookOpen,
      items: [
        { title: "Docs & Guides", url: "/help/docs" },
        { title: "Support", url: "/help/support" },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
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
