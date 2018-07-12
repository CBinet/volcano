import { ApiRoute } from '../api-details/api-routes/api-route-details/api-route.interface';
import { Api } from '../api-details/api.interface';
import { HttpAction } from '../common/http-action.enum';
import { ParamType } from '../common/param-type.enum';
import { ApiRepository } from './api.repository';
import { RouteParam } from '../common/route-param.interface';

export class InMemoryApiRepository extends ApiRepository {

  private apis: Api[] = [{
    id: '1',
    name: 'cars.api',
    description: 'Lorem ipsum dolor sit amet',
    routes: [
      {
        id: '1',
        action: HttpAction.GET,
        name: 'cars',
        description: 'Used to get all the entries from the system.',
        params: []
      },
      {
        id: '2',
        action: HttpAction.GET,
        name: 'cars/:id',
        description: 'Used to get a specific entry from the system.',
        params: [
          {
            key: 'id',
            type: ParamType.String,
            value: '',
            description: ''
          }
        ]
      },
      {
        id: '3',
        action: HttpAction.POST,
        name: 'cars',
        description: 'Used to create a new car entry in the system.',
        params: [
          {
            key: 'model',
            type: ParamType.String,
            value: '',
            description: ''
          },
          {
            key: 'year',
            type: ParamType.Number,
            value: true,
            description: ''
          }

        ]
      },
      {
        id: '4',
        action: HttpAction.PUT,
        name: 'cars/:id',
        description: 'Used to modify an existing entry from the system.',
        params: [
          {
            key: 'id',
            type: ParamType.String,
            value: '',
            description: ''
          },
          {
            key: 'model',
            type: ParamType.String,
            value: '',
            description: ''
          },
          {
            key: 'year',
            type: ParamType.Number,
            value: true,
            description: ''
          }
        ]
      },
      {
        id: '5',
        action: HttpAction.DELETE,
        name: 'cars/:id',
        description: 'Used to remove an entry from the system.',
        params: [
          {
            key: 'id',
            type: ParamType.String,
            value: '',
            description: ''
          }
        ]
      }
    ]
  }];

  findApi(apiId: string): Api {
    return this.apis.find(api => api.id === apiId);
  }

  findApiRoute(apiId: string, routeId: string) {
    return this.findApi(apiId).routes.find(route => route.id === routeId);
  }

  addRoute(apiId: string): void {
    const route: ApiRoute = {
      id: 'route1',
      action: HttpAction.GET,
      name: '',
      description: '',
      params: []
    };
    this.findApi(apiId).routes.unshift(route);
  }

  deleteRoute(apiId: string, routeId: string): void {
    this.apis.find(api => api.id === apiId).routes = this.apis.find(api => api.id === apiId).routes.filter(route => route.id !== routeId);
  }

  addRouteParam(apiId: string, routeId: string): void {
    const param: RouteParam = {
      type: ParamType.String,
      key: 'param1',
      value: '',
      description: ''
    };
    this.findApiRoute(apiId, routeId).params.push(param);
  }

  deleteRouteParam(apiId: string, routeId: string, paramKey: string): void {
    this.findApiRoute(apiId, routeId).params = this.findApiRoute(apiId, routeId).params.filter(param => param.key !== paramKey);
  }
}
