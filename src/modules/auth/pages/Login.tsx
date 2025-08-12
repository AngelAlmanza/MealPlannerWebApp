import { Button } from "@/core/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/core/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/core/components/ui/form"
import { Input } from "@/core/components/ui/input"
import { useLogin } from "../hooks/useLogin"
import { Toaster } from "@/core/components/ui/sonner"
import { useAppSelector } from "@/core/store/hooks"
import { Loader } from "lucide-react"

function Login() {
  const { isAuthLoading } = useAppSelector((state) => state.auth)
  const { form, submitRefBtn, onSubmit, handleClickSubmit } = useLogin()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Iniciar sesión en tu cuenta</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico a continuación para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Contraseña" required {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <button type="submit" className="hiden" ref={submitRefBtn}>
              </button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="button" className="w-full" onClick={handleClickSubmit}>
            {
              isAuthLoading && (
                <span className="animate-spin">
                  <Loader />
                </span>
              )
            }
            Iniciar sesión
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </main>
  )
}

export default Login