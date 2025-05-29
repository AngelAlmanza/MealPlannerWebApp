import { Button } from "@/core/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppSelector } from "@/core/store/hooks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { useIngredientsForm } from "../hooks/useIngredientsForm"

function IngredientsForm() {
  const { selectedIngredient, isIngredientsLoading } = useAppSelector((state) => state.ingredients)
  const { unitMeasures } = useAppSelector((state) => state.unitMeasures)
  const { form, onSubmit, handleCancel } = useIngredientsForm()

  const breadcrumbLinks: BreadcrumbLinkType[] = [
    { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
    { label: "Ingredientes", href: PrivateRoutes.INGREDIENTS },
  ]

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} />
        {
          selectedIngredient ? (
            <SystemBreadcrumbLink
              link={{
                label: "Editar Ingrediente",
                href: PrivateRoutes.INGREDIENTS_EDIT.replace(":id", selectedIngredient.id.toString()),
              }}
              hiddeSeparator
            />
          ) : (
            <SystemBreadcrumbLink
              link={{
                label: "Crear Ingrediente",
                href: PrivateRoutes.INGREDIENTS_CREATE,
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
                  <Input placeholder="Nombre del ingrediente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {
            unitMeasures.length === 0 ? (
              <FormItem>
                <FormLabel>Unidad de medida</FormLabel>
                <FormControl>
                  <Input placeholder="No hay unidades de medida disponibles" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            ) : (
              <FormField
                control={form.control}
                name="unitMeasureId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unidad de medida</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una unidad de medida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          unitMeasures.map((unitMeasure) => (
                            <SelectItem key={unitMeasure.id} value={unitMeasure.id.toString()}>
                              {unitMeasure.name} ({unitMeasure.abbreviation})
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isIngredientsLoading}>
              Cancelar
            </Button>
            <Button type="submit" variant="default" disabled={isIngredientsLoading}>
              Crear
            </Button>
          </div>
        </form>
      </Form>
    </PrivateLayout>
  )
}

export default IngredientsForm