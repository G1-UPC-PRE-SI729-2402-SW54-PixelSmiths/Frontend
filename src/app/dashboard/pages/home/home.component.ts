import { Component, OnInit } from '@angular/core';
import {
  BaseFormComponent,
  BaseFormField,
} from '../../../shared/components/base-form/base-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BaseFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  promotionBannerUrl?: string;

  rentCardFields: BaseFormField[] = [
    { label: 'City', type: 'text', formControlName: 'city' },
    {
      label: 'Fecha de reserva',
      type: 'date',
      formControlName: 'startDate',
    },
    {
      label: 'Fecha de entrega',
      type: 'date',
      formControlName: 'endDate',
    },
  ];
  ngOnInit(): void {
    this.promotionBannerUrl = `/assets/promo-banner.jpeg`;
  }
}
