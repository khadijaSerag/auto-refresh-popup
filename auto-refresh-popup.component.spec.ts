import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRefreshPopupComponent } from './auto-refresh-popup.component';

describe('AutoRefreshPopupComponent', () => {
  let component: AutoRefreshPopupComponent;
  let fixture: ComponentFixture<AutoRefreshPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoRefreshPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRefreshPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
