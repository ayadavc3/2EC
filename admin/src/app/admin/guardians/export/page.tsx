import { Construction, Download } from "lucide-react";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ExportPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/admin/guardians">
                    Guardians
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Export</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator />
        <div className="flex flex-1 flex-col gap-4 p-8">
          <div className="flex items-center justify-center">
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="relative mb-6">
                  <Download className="h-16 w-16 text-muted-foreground mb-2" />
                  <Construction className="h-8 w-8 text-orange-500 absolute -top-1 -right-1" />
                </div>

                <h3 className="text-xl font-semibold mb-2">Export Guardians</h3>

                <p className="text-muted-foreground mb-6 text-sm">
                  This feature is currently under development. Soon you'll be
                  able to export guardian data in various formats for reporting
                  and analysis.
                </p>

                <div className="w-full space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between py-1 border-b border-dashed">
                    <span>• CSV Export</span>
                    <span className="text-orange-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-dashed">
                    <span>• Excel Export</span>
                    <span className="text-orange-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-dashed">
                    <span>• PDF Reports</span>
                    <span className="text-orange-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-dashed">
                    <span>• Custom Filters</span>
                    <span className="text-orange-500">Coming Soon</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span>• Scheduled Exports</span>
                    <span className="text-orange-500">Coming Soon</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg w-full">
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    💡 <strong>Tip:</strong> Currently, you can view and manage
                    guardian data from the main guardians page with the data
                    grid.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
