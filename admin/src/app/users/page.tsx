import { AppSidebar } from "@/components/app-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: string
}

const users: User[] = [
  { id: "usr_1", name: "Anita Borg", email: "anita@example.com", avatar: "/avatars/shadcn.jpg", role: "Admin" },
  { id: "usr_2", name: "Grace Hopper", email: "grace@example.com", avatar: "/avatars/shadcn.jpg", role: "Editor" },
  { id: "usr_3", name: "Ada Lovelace", email: "ada@example.com", avatar: "/avatars/shadcn.jpg", role: "Viewer" },
]

export default function UsersPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <div className="text-sm font-medium">Users</div>
            <div className="ml-auto w-64">
              <Input placeholder="Search users" />
            </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid gap-4 md:grid-cols-3">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader className="flex flex-row items-center gap-3">
                  <Avatar className="h-10 w-10 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base leading-tight">{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Role: {user.role}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}


