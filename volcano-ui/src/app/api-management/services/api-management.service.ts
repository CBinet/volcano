import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from '../api-details/api.interface';
import { ApiRoute } from '../api-details/api-routes/api-route-details/api-route.interface';
import { ApiRepository } from './api.repository';

@Injectable()
export class ApiManagementService {

  constructor(private apiManagementRepository: ApiRepository) {}

  getApiDetails(apiId: string): Observable<Api> {
    return Observable.create(observer => {
      const apiDetails: Api = this.apiManagementRepository.findApi(apiId);
      observer.next(apiDetails);
      observer.complete();
    });
  }

  getRouteDetails(apiId: string, routeId: string): Observable<ApiRoute> {
    return Observable.create(observer => {
      const routeDetails: ApiRoute = this.apiManagementRepository.findApiRoute(apiId, routeId);
      observer.next(routeDetails);
      observer.complete();
    });
  }

  createRoute(apiId: string): Observable<boolean> {
    return Observable.create(observer => {
      this.apiManagementRepository.addRoute(apiId);
      observer.next(true);
      observer.complete();
    });
  }

  deleteRoute(apiId: string, routeId: string): Observable<boolean> {
    return Observable.create(observer => {
      this.apiManagementRepository.deleteRoute(apiId, routeId);
      observer.next(true);
      observer.complete();
    });
  }

  addRouteParam(apiId: string, routeId: string): Observable<boolean> {
    return Observable.create(observer => {
      this.apiManagementRepository.addRouteParam(apiId, routeId);
      observer.next(true);
      observer.complete();
    });
  }

  deleteRouteParam(apiId: string, routeId: string, paramKey: string): Observable<boolean> {
    return Observable.create(observer => {
      this.apiManagementRepository.deleteRouteParam(apiId, routeId, paramKey);
      observer.next(true);
      observer.complete();
    });
  }
}
