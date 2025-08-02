import { useAppDispatch } from "@/core/store/hooks"
import { createMealPlanItem, getMealPlanItems } from "@/core/store/thunks/mealPlanItemThunks"
import { getRecipes } from "@/core/store/thunks/recipeThunks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { MEAL_TYPES } from "../constants/mealTypes"
import { CreateMealItemDto } from "../dtos"
import dayjs from "dayjs"

const mealPlanItemSchema = z.object({
  mealType: z.string().min(1, { message: "Tipo de comida es requerido" }),
  recipeId: z.string().min(1, { message: "Receta es requerida" }),
  date: z.date({ required_error: "Fecha es requerida" }),
})

type MealPlanItem = z.infer<typeof mealPlanItemSchema>

export const useAddMealItem = () => {
  const dispatch = useAppDispatch()
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const form = useForm<MealPlanItem>({
    resolver: zodResolver(mealPlanItemSchema),
    defaultValues: {
      mealType: "",
      recipeId: "",
      date: new Date(),
    },
  })

  const recipieValue = form.watch("recipeId")

  const handleBtnSubmitClick = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click()
    }
  }

  const onSubmit = async (data: MealPlanItem) => {
    let date = data.date

    // Breakfast items should start at 11:30 AM
    if (data.mealType === "breakfast") {
      date = dayjs(data.date).hour(11).minute(30).toDate()
    }

    // Lunch items should start at 05:00 PM
    if (data.mealType === "lunch") {
      date = dayjs(data.date).hour(17).minute(0).toDate()
    }
    // Dinner items should start at 09:30 PM
    if (data.mealType === "dinner") {
      date = dayjs(data.date).hour(21).minute(30).toDate()
    }

    const dto: CreateMealItemDto = {
      mealType: MEAL_TYPES.findIndex(type => type.value === data.mealType) + 1,
      recipeId: data.recipeId,
      date: date.toISOString(),
    }

    await dispatch(createMealPlanItem(dto)).unwrap()
    form.reset()
    dispatch(getMealPlanItems())
  }

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getMealPlanItems())
  }, [dispatch])

  return {
    form,
    recipieValue,
    submitBtnRef,
    handleBtnSubmitClick,
    onSubmit,
  }
}