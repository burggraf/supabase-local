import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/components/auth-provider"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"

export function DashboardLayout() {
  const { session, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!session) return <Navigate to="/login" replace />

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col h-full">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Dashboard</span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 bg-background">
            <Outlet />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
