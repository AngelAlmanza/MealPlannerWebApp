import { PrivateRoutes } from "@/core/enums/routes";
import { useAppDispatch, useAppSelector } from "@/core/store/hooks";
import { setShouldNavigate } from "@/core/store/slices/unitMeasuresSlice";
import {
  createUnitMeasure,
  updateUnitMeasure,
} from "@/core/store/thunks/unitMeasureThunks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { unitMeasureSchema } from "../schema/unitMeasureSchema";
import { unitMeasureSchemaType } from "../types/unitMeasureSchemaType";

export const useUnitMeasureModalForm = () => {
  const { selectedUnitMeasure, shouldNavigate } = useAppSelector((state) => state.unitMeasures);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<unitMeasureSchemaType>({
    resolver: zodResolver(unitMeasureSchema),
    defaultValues: {
      name: "",
      abbreviation: "",
    },
  });

  const onSubmit = async (data: unitMeasureSchemaType) => {
    if (selectedUnitMeasure) {
      dispatch(updateUnitMeasure({ ...data, id: selectedUnitMeasure.id }))
    } else {
      dispatch(createUnitMeasure(data))
    }
  };

  const handleCancel = () => {
    form.reset();
    navigate(PrivateRoutes.UNIT_MEASURES);
  };

  useEffect(() => {
    if (selectedUnitMeasure) {
      form.reset({
        name: selectedUnitMeasure.name,
        abbreviation: selectedUnitMeasure.abbreviation,
      });
    }
  }, [selectedUnitMeasure, form]);

  useEffect(() => {
    if (shouldNavigate) {
      dispatch(setShouldNavigate(false));
      navigate(PrivateRoutes.UNIT_MEASURES);
    }
  }, [shouldNavigate, navigate, dispatch]);

  return {
    form,
    onSubmit,
    handleCancel,
  };
};
