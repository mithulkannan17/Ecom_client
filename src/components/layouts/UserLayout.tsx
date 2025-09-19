import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { UserSidebar } from "@/components/user/UserSidebar"
import { Outlet } from "react-router-dom"

export default function UserLayout() {
    return (
        <SidebarProvider>
            <UserSidebar />
            <main className="w-full h-full flex justify-start items-start">
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    )
}