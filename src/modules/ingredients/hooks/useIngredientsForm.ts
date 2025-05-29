import { PrivateRoutes } from "@/core/enums/routes"
import { useAppDispatch, useAppSelector } from "@/core/store/hooks"
import { setShouldNavigateIngredients } from "@/core/store/slices"
import { createIngredient, updateIngredient } from "@/core/store/thunks/ingredientThunks"
import { getUnitMeasures } from "@/core/store/thunks/unitMeasureThunks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { ingredientSchema } from "../schema/ingredientSchema"
import { IngredientSchemaType } from "../types/ingredientSchemaType"

export const useIngredientsForm = () => {
  const { selectedIngredient, shouldNavigateIngredients } = useAppSelector((state) => state.ingredients)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<IngredientSchemaType>({
    resolver: zodResolver(ingredientSchema),
    defaultValues: {
      name: "",
      unitMeasureId: "",
    },
  })

  const onSubmit = async (data: IngredientSchemaType) => {
    if (selectedIngredient) {
      dispatch(updateIngredient({
        id: selectedIngredient.id,
        name: data.name,
        unitMeasureId: Number(data.unitMeasureId),
      }))
    } else {
      dispatch(createIngredient({
        name: data.name,
        unitMeasureId: Number(data.unitMeasureId),
      }))
    }
  }

  const handleCancel = () => {
    form.reset()
    navigate(PrivateRoutes.INGREDIENTS)
  }

  useEffect(() => {
    if (selectedIngredient) {
      form.reset({
        name: selectedIngredient.name,
        unitMeasureId: selectedIngredient.unitMeasure?.id.toString() || "",
      })
    }
  }, [selectedIngredient, form])

  useEffect(() => {
    if (shouldNavigateIngredients) {
      dispatch(setShouldNavigateIngredients(false))
      navigate(PrivateRoutes.INGREDIENTS)
    }
  }, [shouldNavigateIngredients, navigate, dispatch])

  useEffect(() => {
    dispatch(getUnitMeasures())
  }, [dispatch])

  return {
    form,
    onSubmit,
    handleCancel,
  }
}