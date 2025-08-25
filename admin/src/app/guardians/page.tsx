import { AppSidebar } from "@/components/app-sidebar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DataGrid from "./components/DataGrid"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { PageTitle } from "@/components/PageTitle"
import { GuardianMenu } from "./components/GuardianMenu"

type Guardian = {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

export default function GuardiansPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <div className="text-sm font-medium">Guardians</div>
            <div className="ml-auto w-64">
              <Input placeholder="Search guardians" />
            </div>
          </div>
        </header>
        <Separator />
        <div className="flex flex-1 flex-col gap-4 p-6">
            <PageTitle title="Guardians List" description="Here&apos;s a list of all your guardians in the current organization.">
              <Button variant="default" >
                <PlusIcon /> New Guardian
              </Button>
              <GuardianMenu />
            </PageTitle>
            <DataGrid />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


