import { Button } from "@/core/components/ui/button"
import { Dialog, DialogTrigger } from "@/core/components/ui/dialog"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import type { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { CirclePlus, Funnel } from "lucide-react"
import { RolesModalForm } from "../components/RolesModalForm"

const breadcrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Roles", href: PrivateRoutes.ROLES },
]

// TODO: Add data table with roles
function Roles() {
  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} hiddeSeparator />
      </SystemBreadcrumb>
      <div className="w-full flex items-center justify-end gap-4 mb-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CirclePlus /> Crear Rol
            </Button>
          </DialogTrigger>
          <RolesModalForm />
        </Dialog>

        <Button variant="secondary" size="icon">
          <Funnel />
        </Button>
      </div>
    </PrivateLayout>
  )
}

export default Roles