export interface CreateIngredientDto {
  name: string;
  unitMeasureId: number;
}

export interface UpdateIngredientDto {
  id: number;
  name: string;
  unitMeasureId: number;
}