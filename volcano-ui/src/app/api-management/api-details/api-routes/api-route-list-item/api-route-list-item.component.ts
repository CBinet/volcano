import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';

import { DialogService } from 'ng2-bootstrap-modal';
import { ConfirmModalComponent } from '../../../common/confirm-modal/confirm-modal.component';
import { HttpAction } from '../../../common/http-action.enum';
import { ApiManagementService } from '../../../services/api-management.service';
import { Api } from '../../api.interface';
import { ApiRoute } from '../api-route-details/api-route.interface';

@Component({
  selector: 'app-api-route-list-item',
  templateUrl: './api-route-list-item.component.html',
  styleUrls: ['./api-route-list-item.component.css']
})
export class ApiRouteListItemComponent implements OnInit, AfterViewInit {

  @Input() public api: Api;
  @Input() public route: ApiRoute;
  @ViewChild('routeListItem') listItem: ElementRef;
  @Output() public moveUp: EventEmitter<ApiRoute> = new EventEmitter<ApiRoute>();
  @Output() public moveDown: EventEmitter<ApiRoute> = new EventEmitter<ApiRoute>();

  constructor(private dialogService: DialogService,
              private apiManagementService: ApiManagementService) { }

  ngOnInit() {  }

  ngAfterViewInit() {
    this.addColorsToListItems();
  }

  onActionChange(action: string) {
    this.route.action = <HttpAction> action;
    this.addColorsToListItems();
  }

  onDelete() {
    const disposable = this.dialogService.addDialog(ConfirmModalComponent, {
      title: 'Delete route',
      message: `Are you sure you want to delete ${this.route.action}/ ${this.route.name}?`
    }).subscribe((isConfirmed) => {
      if (isConfirmed) {
          this.apiManagementService.deleteRoute(this.api.id, this.route.id).subscribe(() => {
            this.listItem.nativeElement.remove();
          });
      }
    });
    setTimeout(() => {
        disposable.unsubscribe();
    }, 10000);
  }

  onMoveUp() {
    this.moveUp.emit(this.route);
  }

  onMoveDown() {
    this.moveDown.emit(this.route);
  }

  private addColorsToListItems() {
    const regex = /(success|warning|info|danger)/gm;
    switch (this.route.action) {
      case HttpAction.GET: {
        this.listItem.nativeElement.className = this.listItem.nativeElement.className.replace(regex, 'success');
        break;
      }
      case HttpAction.POST: {
        this.listItem.nativeElement.className = this.listItem.nativeElement.className.replace(regex, 'warning');
        break;
      }
      case HttpAction.PUT: {
        this.listItem.nativeElement.className = this.listItem.nativeElement.className.replace(regex, 'info');
        break;
      }
      case HttpAction.DELETE: {
        this.listItem.nativeElement.className = this.listItem.nativeElement.className.replace(regex, 'danger');
        break;
      }
    }
  }
}
