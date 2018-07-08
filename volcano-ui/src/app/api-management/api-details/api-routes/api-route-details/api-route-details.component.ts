import { Component, OnDestroy, OnInit, Input } from '@angular/core';

import { ApiManagementService } from '../../../services/api-management.service';
import { ApiRoute } from './api-route.interface';
import { Api } from '../../api.interface';
import { ParamType } from '../../../common/param-type.enum';

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

  onInputTypeChange(paramType, paramKey) {
    this.route.params.find(param => {
      return param.key === paramKey;
    }).type = <ParamType> paramType;
  }
}
