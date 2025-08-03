import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setIsDrawerOpen, setSelectedMealPlanItem } from "@/core/store/slices";
import {
  createMealPlanItem,
  deleteMealPlanItem,
  getMealPlanItems,
  updateMealPlanItem,
} from "@/core/store/thunks/mealPlanItemThunks";
import { getRecipes } from "@/core/store/thunks/recipeThunks";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MEAL_TYPES } from "../constants/mealTypes";
import { CreateMealItemDto } from "../dtos";

dayjs.extend(utc);
dayjs.extend(timezone);

const mealPlanItemSchema = z.object({
  mealType: z.string().min(1, { message: "Tipo de comida es requerido" }),
  recipeId: z.string().min(1, { message: "Receta es requerida" }),
  date: z.date({ required_error: "Fecha es requerida" }),
});

type MealPlanItem = z.infer<typeof mealPlanItemSchema>;

export const useAddMealItem = () => {
  const dispatch = useAppDispatch();
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { selectedMealPlanItem } = useAppSelector(
    (state) => state.mealPlanItems
  );

  const form = useForm<MealPlanItem>({
    resolver: zodResolver(mealPlanItemSchema),
    defaultValues: {
      mealType: "",
      recipeId: "",
      date: new Date(),
    },
  });

  const recipieValue = form.watch("recipeId");

  const handleBtnSubmitClick = () => {
    if (submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  const onSubmit = async (data: MealPlanItem) => {
    let localDate = dayjs(data.date);

    // Breakfast items should start at 11:30 AM
    if (data.mealType === "breakfast") {
      localDate = localDate.hour(11).minute(30);
    }

    // Lunch items should start at 05:00 PM
    if (data.mealType === "lunch") {
      localDate = localDate.hour(17).minute(0);
    }
    // Dinner items should start at 09:30 PM
    if (data.mealType === "dinner") {
      localDate = localDate.hour(21).minute(30);
    }

    const utcDate = localDate.utc().toDate();

    const dto: CreateMealItemDto = {
      mealType:
        MEAL_TYPES.findIndex((type) => type.value === data.mealType) + 1,
      recipeId: data.recipeId,
      date: utcDate.toISOString(),
    };

    if (selectedMealPlanItem) {
      await dispatch(
        updateMealPlanItem({ ...dto, id: selectedMealPlanItem.id })
      ).unwrap();
    } else {
      await dispatch(createMealPlanItem(dto)).unwrap();
    }

    form.reset();
    dispatch(getMealPlanItems());
    dispatch(setSelectedMealPlanItem(null));
    dispatch(setIsDrawerOpen(false));
  };

  const handleDeleteMealItem = async () => {
    if (!selectedMealPlanItem) return;

    await dispatch(deleteMealPlanItem(selectedMealPlanItem.id)).unwrap();
    dispatch(setSelectedMealPlanItem(null));
    dispatch(setIsDrawerOpen(false));
    form.reset();
  };

  const handleDrawerClose = (open: boolean) => {
    dispatch(setIsDrawerOpen(open));
    form.reset();
    dispatch(setSelectedMealPlanItem(null));
  };

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getMealPlanItems());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedMealPlanItem) {
      form.reset({
        mealType: "",
        recipeId: "",
        date: new Date(),
      });
      return;
    }

    let mealType: string = "";
    switch (selectedMealPlanItem.mealType) {
      case 1:
        mealType = "breakfast";
        break;
      case 2:
        mealType = "lunch";
        break;
      case 3:
        mealType = "dinner";
        break;
      default:
        mealType = "";
    }

    form.reset({
      mealType: mealType,
      recipeId: selectedMealPlanItem.recipe.id.toString(),
      date: dayjs.utc(selectedMealPlanItem.date).local().toDate(),
    });
  }, [selectedMealPlanItem, form]);

  return {
    form,
    recipieValue,
    submitBtnRef,
    handleBtnSubmitClick,
    handleDrawerClose,
    handleDeleteMealItem,
    onSubmit,
  };
};
