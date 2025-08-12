import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { loginThunk } from "@/core/store/thunks/authThunk"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

type LoginSchemaType = z.infer<typeof loginSchema>

export const useLogin = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth)
  const submitRefBtn = useRef<HTMLButtonElement>(null)
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginSchemaType) => {
    dispatch(loginThunk(data))
  }

  const handleClickSubmit = () => {
    submitRefBtn.current?.click()
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, navigate])

  return {
    submitRefBtn,
    form,
    onSubmit,
    handleClickSubmit,
  }
}