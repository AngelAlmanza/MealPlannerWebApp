import { AppSideBar } from "@/core/components/AppSideBar"
import { SidebarProvider, SidebarTrigger } from "@/core/components/ui/sidebar"

type Props = {
  children: React.ReactNode
}

export const PrivateLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <AppSideBar />
      <div className="w-full h-screen overflow-y-auto">
        <header className="w-full h-20 flex items-center p-4 bg-neutral-50">
          <SidebarTrigger />
        </header>
        <main className="w-full p-4">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}