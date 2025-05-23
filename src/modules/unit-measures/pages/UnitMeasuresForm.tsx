import { Button } from "@/core/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppSelector } from "@/core/store/hooks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { useUnitMeasureModalForm } from "../hooks/useUnitMeasureModalForm"

function UnitMeasuresForm() {
  const { selectedUnitMeasure, isUnitMeasuresLoading } = useAppSelector((state) => state.unitMeasures)
  const { form, onSubmit, handleCancel } = useUnitMeasureModalForm()

  const breadcrumbLinks: BreadcrumbLinkType[] = [
    { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
    { label: "Unidades de medida", href: PrivateRoutes.UNIT_MEASURES },
  ]

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} />
        {
          selectedUnitMeasure ? (
            <SystemBreadcrumbLink
              link={{
                label: "Editar unidad de medida",
                href: PrivateRoutes.UNIT_MEASURES_EDIT.replace(":id", selectedUnitMeasure.id.toString()),
              }}
              hiddeSeparator
            />
          ) : (
            <SystemBreadcrumbLink
              link={{
                label: "Crear unidad de medida",
                href: PrivateRoutes.UNIT_MEASURES_CREATE,
              }}
              hiddeSeparator
            />
          )
        }
      </SystemBreadcrumb>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de la unidad de medida" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="abbreviation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Abreviatura</FormLabel>
                <FormControl>
                  <Input placeholder="Abreviatura de la unidad de medida" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isUnitMeasuresLoading}>
              Cancelar
            </Button>
            <Button type="submit" variant="default" disabled={isUnitMeasuresLoading}>
              Crear
            </Button>
          </div>
        </form>
      </Form>
    </PrivateLayout>
  )
}
export default UnitMeasuresForm