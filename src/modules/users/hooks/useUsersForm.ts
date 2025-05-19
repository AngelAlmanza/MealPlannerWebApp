import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { userSchema } from "../schema/userSchema"
import type { UserSchemaType } from "../types/userSchemaType"

export const useUsersForm = () => {
  const navigate = useNavigate()
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      roleId: "",
    },
  })

  const onSubmit = (data: UserSchemaType) => {
    console.log(data)
  }

  const onCancel = () => {
    form.reset()
    navigate("/users")
  }

  return {
    form,
    onSubmit,
    onCancel,
  }
}