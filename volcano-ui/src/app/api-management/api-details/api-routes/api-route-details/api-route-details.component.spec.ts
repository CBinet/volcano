import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiRouteDetailsComponent } from './api-route-details.component';

describe('ApiRouteDetailsComponent', () => {
  let component: ApiRouteDetailsComponent;
  let fixture: ComponentFixture<ApiRouteDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiRouteDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiRouteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
