import { Button } from "@/core/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import { Textarea } from "@/core/components/ui/textarea"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { useAppSelector } from "@/core/store/hooks"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { useRecipesForm } from "../hooks/useRecipesForm"
import { CirclePlus } from "lucide-react"

function RecipesForm() {
  const { selectedRecipe, isRecipesLoading } = useAppSelector((state) => state.recipes)
  const { ingredients } = useAppSelector((state) => state.ingredients)
  const { form, fields, onSubmit, handleCancel, handleAddIngredient, remove } = useRecipesForm()

  const breadcrumbLinks: BreadcrumbLinkType[] = [
    { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
    { label: "Recetas", href: PrivateRoutes.RECIPES },
  ]

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadcrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadcrumbLinks[1]} />
        {
          selectedRecipe ? (
            <SystemBreadcrumbLink
              link={{
                label: "Editar Receta",
                href: PrivateRoutes.INGREDIENTS_EDIT.replace(":id", selectedRecipe.id.toString()),
              }}
              hiddeSeparator
            />
          ) : (
            <SystemBreadcrumbLink
              link={{
                label: "Crear Receta",
                href: PrivateRoutes.INGREDIENTS_CREATE,
              }}
              hiddeSeparator
            />
          )
        }
      </SystemBreadcrumb>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la receta</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la receta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="servings"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Porciones</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      min={1}
                      max={100}
                      placeholder="Número de porciones"
                      {...form.register("servings", { valueAsNumber: true })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la receta</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com/receta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instrucciones</FormLabel>
                <FormControl>
                  <Textarea placeholder="Instrucciones de la receta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Ingredientes</h3>
            <Button type="button" onClick={handleAddIngredient} size="icon">
              <CirclePlus />
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingrediente</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                fields.map((item, index) => (
                  <TableRow key={item.id + index}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.ingredientId`}
                        render={({ field }) => (
                          <FormItem>
                            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un ingrediente" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {
                                  ingredients.map((ingredient) => (
                                    <SelectItem key={ingredient.id} value={ingredient.id.toString()}>
                                      {ingredient.name} ({ingredient.unitMeasure.name})
                                    </SelectItem>
                                  ))
                                }
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`ingredients.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min={1}
                                max={1000}
                                placeholder="Cantidad"
                                {...form.register(`ingredients.${index}.quantity`, { valueAsNumber: true })}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => remove(index)}
                      >
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>

          {/* ...botones de acción... */}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={handleCancel} disabled={isRecipesLoading}>
              Cancelar
            </Button>
            <Button type="submit" variant="default" disabled={isRecipesLoading}>
              {selectedRecipe ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </form>
      </Form>
    </PrivateLayout>
  )
}

export default RecipesForm