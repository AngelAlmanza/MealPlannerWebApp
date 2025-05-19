import { Button } from "@/core/components/ui/button"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { CirclePlus, Funnel } from "lucide-react"
import { useNavigate } from "react-router-dom"

const breadCrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Users", href: PrivateRoutes.USERS },
]

// TODO: Add data table with users

function Users() {
  const navigate = useNavigate()

  const handleCreateUser = () => {
    navigate(PrivateRoutes.USERS_FORM)
  }

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadCrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadCrumbLinks[1]} hiddeSeparator />
      </SystemBreadcrumb>
      <div className="w-full flex items-center justify-end gap-4 mb-4">
        <Button onClick={handleCreateUser}>
          <CirclePlus /> Crear Usuario
        </Button>
        <Button variant="secondary" size="icon">
          <Funnel />
        </Button>
      </div>
    </PrivateLayout>
  )
}

export default Users