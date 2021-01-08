import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfServiceTableComponent } from './type-of-service-table.component';

describe('TypeOfServiceTableComponent', () => {
  let component: TypeOfServiceTableComponent;
  let fixture: ComponentFixture<TypeOfServiceTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfServiceTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfServiceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
