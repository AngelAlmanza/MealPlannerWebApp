import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/components/ui/sidebar"
import { PrivateRoutes } from "@/core/enums/routes"
import { ChefHat, LayoutDashboard, Ruler, ShoppingBasket } from "lucide-react"
import { Link } from "react-router-dom"

const items = [
  {
    title: "Dashboard",
    url: PrivateRoutes.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    title: "Ingredientes",
    url: PrivateRoutes.INGREDIENTS,
    icon: ShoppingBasket,
  },
  {
    title: "Recetas",
    url: PrivateRoutes.RECIPES,
    icon: ChefHat,
  },
  {
    title: "Unidades de Medida",
    url: PrivateRoutes.UNIT_MEASURES,
    icon: Ruler,
  },
]

export const AppSideBar = () => {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {
              items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}