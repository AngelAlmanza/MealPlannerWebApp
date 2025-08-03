import { Button } from "@/core/components/ui/button"
import { Calendar } from "@/core/components/ui/calendar"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/core/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/core/components/ui/table"
import { cn } from "@/core/lib/utils"
import { useAppSelector } from "@/core/store/hooks"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Plus, Trash2, X } from "lucide-react"
import { MEAL_TYPES } from "../constants/mealTypes"
import { useAddMealItem } from "../hooks/useAddMealItem"

export const AddMealItem = () => {
  const { form, recipieValue, submitBtnRef, onSubmit, handleBtnSubmitClick, handleDrawerClose, handleDeleteMealItem } = useAddMealItem();
  const { isDrawerOpen, selectedMealPlanItem } = useAppSelector((state) => state.mealPlanItems);
  const { recipes } = useAppSelector((state) => state.recipes);

  return (
    <Drawer direction="right" open={isDrawerOpen} onOpenChange={handleDrawerClose}>
      <DrawerTrigger asChild>
        <Button>
          <Plus />
          Añadir comida
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-[400px] mt-0 ml-auto rounded-l-lg fixed right-0 top-0">
        <DrawerHeader>
          <DrawerTitle>Añadir comida para la semana</DrawerTitle>
          <DrawerDescription>Añade la receta que deseas planificar para la semana.</DrawerDescription>
        </DrawerHeader>

        <Form {...form}>
          <form className="px-6 py-4 space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

            <FormField
              control={form.control}
              name="mealType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de comida</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de comida" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        MEAL_TYPES.map((mealType) => (
                          <SelectItem key={mealType.value} value={mealType.value}>
                            {mealType.label}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              recipes.length === 0 ? (
                <FormItem>
                  <FormLabel>Recetas</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="No hay recetas disponibles" />
                  </FormControl>
                </FormItem>
              ) : (
                <FormField
                  control={form.control}
                  name="recipeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recetas</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una receta" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            recipes.map((recipe) => (
                              <SelectItem key={recipe.id} value={recipe.id.toString()}>
                                {recipe.name}
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline" className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}>
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      align="start"
                      side="bottom"
                      usePortal={false}
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button
              ref={submitBtnRef}
              type="submit"
              className="hidden"
            ></button>

          </form>
        </Form>

        <div className="px-6 py-4">
          {
            recipieValue && (
              <Table>
                <TableCaption>
                  Lista de ingredientes para la receta seleccionada
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ingrediente</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Unidad</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    recipes.find(r => r.id.toString() === recipieValue)?.ingredients.map(i => (
                      <TableRow key={i.id}>
                        <TableCell>{i.ingredient.name}</TableCell>
                        <TableCell>{i.quantity}</TableCell>
                        <TableCell>{i.ingredient.unitMeasure.abbreviation}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            )
          }
        </div>

        <DrawerFooter>
          {
            selectedMealPlanItem && (
              <Button variant="destructive" onClick={handleDeleteMealItem} className="w-full">
                <Trash2 />
                Eliminar comida
              </Button>
            )
          }
          <Button onClick={handleBtnSubmitClick} className="w-full">
            <Plus />
            Guardar
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              <X />
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}