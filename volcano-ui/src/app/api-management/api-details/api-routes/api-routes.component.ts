import { Component, OnInit, Input } from '@angular/core';
import { Api } from '../api.interface';
import { DialogService } from 'ng2-bootstrap-modal';
import { ApiManagementService } from '../../services/api-management.service';
import { ConfirmModalComponent } from '../../common/confirm-modal/confirm-modal.component';
import { ApiRoute } from './api-route-details/api-route.interface';

@Component({
  selector: 'app-api-routes',
  templateUrl: './api-routes.component.html'
})
export class ApiRoutesComponent implements OnInit {

  @Input() public api: Api;

  constructor(private dialogService: DialogService,
              private apiManagementService: ApiManagementService) { }

  ngOnInit() {
  }

  onCreateRoute() {
    const disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      title: 'Create route',
      message: `Create a new route ?`
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
          this.apiManagementService.createRoute(this.api.id).subscribe(() => {

          });
      }
    });
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  onMoveUp(route: ApiRoute) {
    const currentIndex = this.api.routes.indexOf(route);
    this.api.routes = this.swapArray(this.api.routes, currentIndex - 1, currentIndex);
  }

  onMoveDown(route: ApiRoute) {
    const currentIndex = this.api.routes.indexOf(route);
    this.api.routes = this.swapArray(this.api.routes, currentIndex, currentIndex + 1);
  }

  private swapArray = function(arr, indexA, indexB) {
    const temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
    return arr;
  };
}
