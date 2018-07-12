import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ParamType } from '../../../common/param-type.enum';
import { ApiManagementService } from '../../../services/api-management.service';
import { Api } from '../../api.interface';
import { ApiRoute } from './api-route.interface';
import { RouteParam } from '../../../common/route-param.interface';

@Component({
  selector: 'app-api-route-details',
  templateUrl: './api-route-details.component.html'
})
export class ApiRouteDetailsComponent implements OnInit, OnDestroy {

  @Input() public api: Api;
  @Input() public route: ApiRoute;

  constructor(private apiManagementService: ApiManagementService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  onAddParam() {
    this.apiManagementService.addRouteParam(this.api.id, this.route.id).subscribe(success => {

    });
  }

  onDeleteParam(paramKey: string) {
    this.apiManagementService.deleteRouteParam(this.api.id, this.route.id, paramKey).subscribe(success => {

    });
  }

  onMoveUp(param: RouteParam) {
    const currentIndex = this.route.params.indexOf(param);
    this.route.params = this.swapArray(this.route.params, currentIndex - 1, currentIndex);
  }

  onMoveDown(param: RouteParam) {
    const currentIndex = this.route.params.indexOf(param);
    this.route.params = this.swapArray(this.route.params, currentIndex, currentIndex + 1);
  }

  private swapArray = function(arr, indexA, indexB) {
    const temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
    return arr;
  };

  onInputTypeChange(paramType, paramKey) {
    this.route.params.find(param => {
      return param.key === paramKey;
    }).type = <ParamType> paramType;
  }
}
