import { Component, OnDestroy, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiManagementService } from '../services/api-management.service';
import { Api } from './api.interface';

@Component({
  selector: 'app-api-details',
  templateUrl: './api-details.component.html'
})
export class ApiDetailsComponent implements OnInit, OnDestroy {

  public api: Api;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private apiManagementService: ApiManagementService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      const apiId = params['apiId'];
      this.apiManagementService.getApiDetails(apiId).subscribe(api => {
        this.api = api;
      });
   });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
