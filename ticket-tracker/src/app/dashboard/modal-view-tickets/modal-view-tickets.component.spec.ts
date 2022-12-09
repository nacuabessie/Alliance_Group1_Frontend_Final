import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewTicketsComponent } from './modal-view-tickets.component';

describe('ModalViewTicketsComponent', () => {
  let component: ModalViewTicketsComponent;
  let fixture: ComponentFixture<ModalViewTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
