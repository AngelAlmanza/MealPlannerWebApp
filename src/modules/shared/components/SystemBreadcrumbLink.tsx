import { BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/core/components/ui/breadcrumb"
import { Link } from "react-router-dom"
import type { BreadcrumbLinkType } from "../types/BreadcrumbLinkType"

type Props = {
  link: BreadcrumbLinkType
  hiddeSeparator?: boolean
}

export const SystemBreadcrumbLink = ({ link, hiddeSeparator = false }: Props) => {
  return (
    <>
      <BreadcrumbItem>
        <BreadcrumbLink className="text-lg text-slate-700 hover:underline" asChild>
          <Link to={link.href}>
            {link.label}
          </Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      {
        !hiddeSeparator && (
          <BreadcrumbSeparator className="text-lg text-slate-700" />
        )
      }
    </>
  )
}