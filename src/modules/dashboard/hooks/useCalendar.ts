import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setIsDrawerOpen, setSelectedMealPlanItem } from "@/core/store/slices";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useCallback, useMemo, useState } from "react";
import { MealPlanItemEvent } from "../interfaces";
import { View } from "react-big-calendar";

dayjs.extend(utc);
dayjs.extend(timezone);

export const useCalendar = () => {
  const { mealPlanItems } = useAppSelector((state) => state.mealPlanItems);
  const [currentView, setCurrentView] = useState<View>("month");
  const dispatch = useAppDispatch();

  const events = useMemo(() => {
  return mealPlanItems.map((item) => {
    const localStart = dayjs.utc(item.date).local();
    return {
      id: item.id,
      title: item.recipe.name,
      start: localStart.toDate(),
      end: localStart.add(1, "hour").toDate(),
    };
  });
}, [mealPlanItems]);

  const handleSelectEvent = useCallback((event: MealPlanItemEvent) => {
    const mealPlanItem = mealPlanItems.find(item => item.id === event.id);
    if (mealPlanItem) {
      dispatch(setSelectedMealPlanItem(mealPlanItem));
      dispatch(setIsDrawerOpen(true));
    }
  }, [dispatch, mealPlanItems]);

  const handleViewChange = useCallback((view: View) => {
    setCurrentView(view);
  }, []);

  return {
    events,
    handleSelectEvent,
    currentView,
    handleViewChange
  };
};
