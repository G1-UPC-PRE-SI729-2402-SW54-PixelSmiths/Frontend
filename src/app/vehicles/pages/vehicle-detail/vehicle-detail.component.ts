import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import {
  BaseFormComponent,
  BaseFormField,
} from '../../../shared/components/base-form/base-form.component';
import { lastValueFrom } from 'rxjs';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [BaseFormComponent, MatIconModule, MatIconButton, NgStyle],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  vehiclesService = inject(VehiclesService);
  vehicle: any;
  image?: string;

  fields: BaseFormField[] = [];
  async ngOnInit() {
    const vehicleId = this.route.snapshot.paramMap.get('id') ?? '';

    if (vehicleId) {
      this.vehicle = (
        await lastValueFrom(this.vehiclesService.find({ id: vehicleId }))
      )?.[0];

      this.image = this.vehicle.images?.[0] 
    }

    this.fields = [
      {
        formControlName: 'brand',
        placeholder: 'Brand',
        type: 'text',
        value: this.vehicle.brand,
      },
      {
        formControlName: 'model',
        placeholder: 'Model',
        type: 'text',
        value: this.vehicle.model,
      },
      {
        formControlName: 'price',
        placeholder: 'Price For Rent',
        type: 'text',
        value: this.vehicle.price,
      },
      {
        formControlName: 'plate',
        placeholder: 'Plate',
        type: 'text',
        value: this.vehicle.plate,
      },
      {
        formControlName: 'color',
        placeholder: 'Color',
        type: 'text',
        value: this.vehicle.color,
      },
    ];
  }

  goBack() {
    history.back();
  }
}
