import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRouteListItemComponent } from './api-route-list-item.component';

describe('ApiRouteListItemComponent', () => {
  let component: ApiRouteListItemComponent;
  let fixture: ComponentFixture<ApiRouteListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRouteListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRouteListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
