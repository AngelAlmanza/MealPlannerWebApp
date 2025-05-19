import { Button } from "@/core/components/ui/button"
import { DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/core/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { useRoleModalForm } from "../hooks/useRoleModalForm"

export const RolesModalForm = () => {
  const { form, onSubmit } = useRoleModalForm()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Crear Rol</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del rol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Input placeholder="Descripción del rol" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="flex items-center justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => form.reset()}>
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" variant="default">
              Crear
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}