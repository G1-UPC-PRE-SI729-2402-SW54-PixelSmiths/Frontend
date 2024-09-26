import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCreateAndEditComponent } from './invoice-create-and-edit.component';

describe('InvoiceCreateAndEditComponent', () => {
  let component: InvoiceCreateAndEditComponent;
  let fixture: ComponentFixture<InvoiceCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceCreateAndEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
