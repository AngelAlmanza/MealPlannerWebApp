import { PrivateRoutes } from "@/core/enums/routes";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setShouldNavigateRecipes } from "@/core/store/slices";
import { getIngredients } from "@/core/store/thunks/ingredientThunks";
import { createRecipe, updateRecipe } from "@/core/store/thunks/recipeThunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { recipeSchema } from "../schema/recipeSchema";
import { RecipeSchemaType } from "../types/recipeSchemaType";

export const useRecipesForm = () => {
  const { selectedRecipe, shouldNavigateRecipes } = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<RecipeSchemaType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      servings: 0,
      url: "",
      ingredients: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const handleAddIngredient = () => {
    append({ ingredientId: "", quantity: 1 });
  };

  const onSubmit = async (data: RecipeSchemaType) => {
    if (selectedRecipe) {
      dispatch(
        updateRecipe({
          id: selectedRecipe.id,
          name: data.name,
          description: data.description,
          servings: data.servings,
          url: data.url || null,
          ingredients: data.ingredients?.map((ingredient) => ({
            ingredientId: parseInt(ingredient.ingredientId, 10),
            quantity: ingredient.quantity,
          })) || [],
        })
      );
    } else {
      dispatch(
        createRecipe({
          name: data.name,
          description: data.description,
          servings: data.servings,
          url: data.url || null,
          ingredients: data.ingredients?.map((ingredient) => ({
            ingredientId: parseInt(ingredient.ingredientId, 10),
            quantity: ingredient.quantity,
          })) || [],
        })
      );
    }
  };

  const handleCancel = () => {
    form.reset();
    navigate(PrivateRoutes.RECIPES);
  };

  useEffect(() => {
    if (selectedRecipe) {
      form.reset({
        name: selectedRecipe.name,
        description: selectedRecipe.description,
        servings: selectedRecipe.servings,
        url: selectedRecipe.url || "",
        ingredients: selectedRecipe.ingredients.map((ingredient) => ({
          ingredientId: ingredient.ingredient.id.toString(),
          quantity: ingredient.quantity,
        })),
      });
    }
  }, [selectedRecipe, form]);

  useEffect(() => {
    if (shouldNavigateRecipes) {
      dispatch(setShouldNavigateRecipes(false));
      navigate(PrivateRoutes.RECIPES);
    }
  }, [shouldNavigateRecipes, navigate, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return {
    form,
    fields,
    onSubmit,
    handleCancel,
    remove,
    handleAddIngredient,
  };
};
