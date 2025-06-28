import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, PlusCircle, FileText, Eye } from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Create Post",
    url: "/admin/create",
    icon: PlusCircle,
  },
  {
    title: "Manage Posts",
    url: "/admin/posts",
    icon: FileText,
  },
  {
    title: "View Blog",
    url: "/posts",
    icon: Eye,
  },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-4">
          <h2 className="text-lg font-semibold">Blog Admin</h2>
          <p className="text-sm text-muted-foreground">Content Management</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2 py-4">
          <p className="text-xs text-muted-foreground">Blog Management System v1.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
