import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../api-details/api.interface';
import { HttpAction } from '../common/http-action.enum';
import { ApiRoute } from '../api-details/api-routes/api-route-details/api-route.interface';
import { ParamType } from '../common/param-type.enum';
import { RouteParam } from '../common/route-param.interface';

@Injectable()
export class ApiManagementService {

  private apis: Api[] = [{
    id: '1',
    name: 'hello-world.api',
    description: 'Lorem ipsum dolor sit amet',
    routes: [
      {
        id: '1',
        action: HttpAction.GET,
        name: 'hello-world',
        params: [
          {
            key: 'name',
            type: ParamType.String,
            value: 'Charles Binet',
            description: 'Lorem ipsum dolor sit amet'
          }
        ]
      },
      {
        id: '2',
        action: HttpAction.GET,
        name: 'hello-world/:id',
        params: []
      },
      {
        id: '3',
        action: HttpAction.POST,
        name: 'hello-world',
        params: [
          {
            key: 'name',
            type: ParamType.String,
            value: 'Charles Binet',
            description: 'Lorem ipsum dolor sit amet'
          },
          {
            key: 'boolean',
            type: ParamType.Boolean,
            value: true,
            description: 'Lorem ipsum dolor sit amet'
          }

        ]
      },
      {
        id: '4',
        action: HttpAction.PUT,
        name: 'hello-world',
        params: [
          {
            key: 'name',
            type: ParamType.String,
            value: 'Charles Binet',
            description: 'Lorem ipsum dolor sit amet'
          }
        ]
      },
      {
        id: '5',
        action: HttpAction.DELETE,
        name: 'hello-world',
        params: [
          {
            key: 'id',
            type: ParamType.Number,
            value: 1,
            description: 'Short description'
          }
        ]
      }
    ]
  }];

  getApiDetails(apiId: string): Observable<Api> {
    return Observable.create(observer => {
      const apiDetails: Api = this.apis.find(api => api.id === apiId);
      observer.next(apiDetails);
      observer.complete();
    });
  }

  getRouteDetails(apiId: string, routeId: string): Observable<ApiRoute> {
    return Observable.create(observer => {
      const routeDetails: ApiRoute = this.apis.find(api => api.id === apiId).routes.find(route => route.id === routeId);
      observer.next(routeDetails);
      observer.complete();
    });
  }

  createRoute(apiId: string): Observable<boolean> {
    return Observable.create(observer => {
      const route: ApiRoute = {
        id: '1543',
        action: HttpAction.GET,
        name: '',
        params: []
      };
      this.apis.find(api => api.id === apiId).routes.unshift(route);
      observer.next(true);
      observer.complete();
    });
  }

  deleteRoute(apiId: string, routeId: string): Observable<boolean> {
    return Observable.create(observer => {
      this.apis.find(api => api.id === apiId).routes = this.apis.find(api => api.id === apiId).routes.filter(route => route.id !== routeId);
      observer.next(true);
      observer.complete();
    });
  }
}
