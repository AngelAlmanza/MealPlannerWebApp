import { Button } from "@/core/components/ui/button"
import { Card, CardContent, CardHeader } from "@/core/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { PrivateRoutes } from "@/core/enums/routes"
import { PrivateLayout } from "@/core/layouts/PrivateLayout"
import { SystemBreadcrumb } from "@/modules/shared/components/SystemBreadcrumb"
import { SystemBreadcrumbLink } from "@/modules/shared/components/SystemBreadcrumbLink"
import { BreadcrumbLinkType } from "@/modules/shared/types/BreadcrumbLinkType"
import { useUsersForm } from "../hooks/useUsersForm"

const breadCrumbLinks: BreadcrumbLinkType[] = [
  { label: "Dashboard", href: PrivateRoutes.DASHBOARD },
  { label: "Users", href: PrivateRoutes.USERS },
  { label: "Crear Usuario", href: PrivateRoutes.USERS_FORM },
]

function UsersForm() {
  const { form, onSubmit, onCancel } = useUsersForm()

  return (
    <PrivateLayout>
      <SystemBreadcrumb>
        <SystemBreadcrumbLink link={breadCrumbLinks[0]} />
        <SystemBreadcrumbLink link={breadCrumbLinks[1]} />
        <SystemBreadcrumbLink link={breadCrumbLinks[2]} hiddeSeparator />
      </SystemBreadcrumb>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Crear Usuario</h2>
          <p className="text-sm text-muted-foreground">Completa el siguiente formulario para crear un nuevo usuario.</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre de usuario</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre de usuario" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input placeholder="Correo electrónico" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Contraseña" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div />

              <div className="flex items-center justify-end space-x-2">
                <Button variant="destructive" onClick={onCancel}>
                  Cancelar
                </Button>
                <Button type="submit" variant="default">
                  Crear
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </PrivateLayout>
  )
}

export default UsersForm