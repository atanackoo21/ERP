import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfServiceDialogComponent } from './type-of-service-dialog.component';

describe('TypeOfServiceDialogComponent', () => {
  let component: TypeOfServiceDialogComponent;
  let fixture: ComponentFixture<TypeOfServiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfServiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
