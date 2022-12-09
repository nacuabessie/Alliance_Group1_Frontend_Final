import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModalCreateComponent } from './request-modal-create.component';

describe('RequestModalCreateComponent', () => {
  let component: RequestModalCreateComponent;
  let fixture: ComponentFixture<RequestModalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestModalCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
