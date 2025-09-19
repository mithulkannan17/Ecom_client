import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function AdminLayout() {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <main className="w-full h-full flex justify-start items-start">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}