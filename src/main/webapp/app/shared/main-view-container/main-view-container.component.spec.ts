import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MainViewContainerComponent} from './main-view-container.component';

describe('MainViewContainerComponent', () => {
  let component: MainViewContainerComponent;
  let fixture: ComponentFixture<MainViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
