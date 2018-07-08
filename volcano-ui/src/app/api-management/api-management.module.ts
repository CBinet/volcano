import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiDetailsComponent } from './api-details/api-details.component';
import { ApiRouteDetailsComponent } from './api-details/api-routes/api-route-details/api-route-details.component';
import { ApiRouteListItemComponent } from './api-details/api-routes/api-route-list-item/api-route-list-item.component';
import { ApiRoutesComponent } from './api-details/api-routes/api-routes.component';
import { ApiManagementRoutingModule } from './api-management-routing.module';
import { ConfirmModalComponent } from './common/confirm-modal/confirm-modal.component';
import { ApiManagementService } from './services/api-management.service';

@NgModule({
  declarations: [
    ApiDetailsComponent,
    ApiRoutesComponent,
    ApiRouteListItemComponent,
    ApiRouteDetailsComponent,
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BootstrapModalModule.forRoot({container: document.body}),
    ApiManagementRoutingModule,
    NgbModule.forRoot(),
  ],
  entryComponents: [
    ConfirmModalComponent
  ],
  providers: [
    ApiManagementService
  ]
})
export class ApiManagementModule { }
