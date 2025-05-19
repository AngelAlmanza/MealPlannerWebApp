import { Breadcrumb, BreadcrumbList } from "@/core/components/ui/breadcrumb"

type Props = {
  children: React.ReactNode
}

export const SystemBreadcrumb = ({ children }: Props) => {
  return (
    <div className="w-full mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          {children}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}