import { z } from 'zod';
import { unitMeasureSchema } from '../schema/unitMeasureSchema';

export type unitMeasureSchemaType = z.infer<typeof unitMeasureSchema>;