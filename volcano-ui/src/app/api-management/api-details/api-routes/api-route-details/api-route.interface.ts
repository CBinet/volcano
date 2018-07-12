import { HttpAction } from '../../../common/http-action.enum';
import { RouteParam } from '../../../common/route-param.interface';

export interface ApiRoute {
  id: string;
  action: HttpAction;
  name: string;
  description: string;
  params: RouteParam[];
}
