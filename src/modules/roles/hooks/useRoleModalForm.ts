import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { roleSchema } from "../schema/roleSchema"
import type { RoleSchemaType } from "../types/roleSchemaType"

export const useRoleModalForm = () => {
  const form = useForm<RoleSchemaType>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      name: "",
      description: "",
    }
  })

  const onSubmit = async (data: RoleSchemaType) => {
    console.log(data)
  }

  return {
    form,
    onSubmit,
  }
}