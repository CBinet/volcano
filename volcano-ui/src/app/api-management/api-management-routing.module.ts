import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiDetailsComponent } from './api-details/api-details.component';

const appRoutes: Routes = [
  {path: 'api/:apiId', component: ApiDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class ApiManagementRoutingModule {
}
