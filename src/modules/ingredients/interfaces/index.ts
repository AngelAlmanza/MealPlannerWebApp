import { UnitMeasures } from "@/modules/unit-measures/interfaces";

export interface Ingredient {
  id: number;
  name: string;
  unitMeasureId: number;
  unitMeasure: UnitMeasures;
}

