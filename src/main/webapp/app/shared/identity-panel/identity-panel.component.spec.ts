import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {IdentityPanelComponent} from './identity-panel.component';

describe('IdentityPanelComponent', () => {
  let component: IdentityPanelComponent;
  let fixture: ComponentFixture<IdentityPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentityPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
