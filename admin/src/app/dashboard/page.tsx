"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Signups</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    signups: { label: "Signups", color: "hsl(var(--chart-1))" },
                  }}
                >
                  <LineChart data={[
                    { month: "Jan", signups: 120 },
                    { month: "Feb", signups: 190 },
                    { month: "Mar", signups: 160 },
                    { month: "Apr", signups: 220 },
                    { month: "May", signups: 260 },
                    { month: "Jun", signups: 240 },
                  ]}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis width={30} tickFormatter={(v) => String(v)} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="signups"
                      stroke="var(--color-signups)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{ revenue: { label: "Revenue", color: "hsl(var(--chart-2))" } }}
                >
                  <AreaChart data={[
                    { month: "Jan", revenue: 24 },
                    { month: "Feb", revenue: 35 },
                    { month: "Mar", revenue: 30 },
                    { month: "Apr", revenue: 40 },
                    { month: "May", revenue: 48 },
                    { month: "Jun", revenue: 55 },
                  ]}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} />
                    <YAxis width={30} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      fill="var(--color-revenue)"
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    skills: { label: "Score", color: "hsl(var(--chart-3))" },
                  }}
                >
                  <RadarChart data={[
                    { subject: "Frontend", skills: 120 },
                    { subject: "Backend", skills: 110 },
                    { subject: "DevOps", skills: 98 },
                    { subject: "QA", skills: 86 },
                    { subject: "Design", skills: 99 },
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar
                      name="Score"
                      dataKey="skills"
                      stroke="var(--color-skills)"
                      fill="var(--color-skills)"
                      fillOpacity={0.2}
                    />
                    <ChartLegend content={<ChartLegendContent />} />
                  </RadarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="md:min-h-min min-h-[40vh] flex-1">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Use the charts above to monitor key metrics.
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
