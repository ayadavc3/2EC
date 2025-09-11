import { CsvImport } from "@/components/CsvImport";
import { ImportHelper } from "@/components/ImportHelper";
import { PageTitle } from "@/components/PageTitle";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
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
                  <BreadcrumbLink href="/admin/students">
                    Students
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Import</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <Separator />
        <div className="flex flex-1 flex-col gap-4 p-8">
          <PageTitle
            title="Students Import"
            description="Select a CSV file to import students into the database."
          >
            <Button>Download Template</Button>
          </PageTitle>
          <div className="flex flex-1 gap-8">
            <ImportHelper />
            <CsvImport />
            {/* Show validation errors here and option to abort the import */}
            {/* Show grid data here if there are no validation errors */}
            {/* Show button to proceed with the import */}
            {/* Show bulk data progression in grid itself */}
            {/* Show dtats of data imported and failed to import along with option to download the data report */}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
