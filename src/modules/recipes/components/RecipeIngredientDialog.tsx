import { Button } from "@/core/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { useAppSelector } from "@/core/store/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ingredientSchema } from "../schema/recipeSchema"
import { IngredientRecipeSchemaType } from "../types/recipeSchemaType"

export const RecipeIngredientDialog = () => {
  const { ingredients } = useAppSelector((state) => state.ingredients)

  const form = useForm<IngredientRecipeSchemaType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      ingredientId: "",
      quantity: 0,
    }
  })

  const handleSubmit = (data: IngredientRecipeSchemaType) => {
    console.log("Ingrediente añadido:", data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Añadir ingrediente
        </Button>
      </DialogTrigger>
      <DialogContent>

        <DialogTitle>
          Añadir Ingrediente
        </DialogTitle>
        <DialogDescription>
          Aquí puedes añadir un nuevo ingrediente a la receta. Completa los detalles necesarios y guarda los cambios.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

            <FormField
              control={form.control}
              name="ingredientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingrediente</FormLabel>
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
                            {ingredient.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cantidad</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      {...form.register("quantity", { valueAsNumber: true })}
                      placeholder="Cantidad del ingrediente"
                      type="number"
                      min={0}
                      max={1000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancelar
                </Button>
              </DialogClose>
              <Button>
                Guardar Ingrediente
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}