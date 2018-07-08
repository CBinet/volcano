import { ParamType } from './param-type.enum';

export interface RouteParam {
  key: string;
  type: ParamType;
  value: any;
  description: string;
}
