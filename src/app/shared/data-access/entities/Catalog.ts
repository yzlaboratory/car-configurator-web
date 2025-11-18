import { Color } from './Color';
import { Extra } from './Extra';
import { Motorization } from './Motorization';
import { Rim } from './Rims';

export interface Catalog {
  modelId: string;
  colors: Color[];
  motorizations: Motorization[];
  rims: Rim[];
  extras: Extra[];
}
