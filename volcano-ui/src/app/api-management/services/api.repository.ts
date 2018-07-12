import { Api } from '../api-details/api.interface';
import { ApiRoute } from '../api-details/api-routes/api-route-details/api-route.interface';

export abstract class ApiRepository {

  abstract findApi(apiId: string): Api;
  abstract findApiRoute(apiId: string, routeId: string): ApiRoute;
  abstract addRoute(apiId: string): void;
  abstract deleteRoute(apiId: string, routeId: string): void;
  abstract addRouteParam(apiId: string, routeId: string): void;
  abstract deleteRouteParam(apiId: string, routeId: string, paramKey: string): void;
}
