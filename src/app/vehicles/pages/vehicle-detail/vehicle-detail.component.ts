import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiclesService } from '../../services/vehicles.service';
import {
  BaseFormComponent,
  BaseFormField,
} from '../../../shared/components/base-form/base-form.component';
import { lastValueFrom } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { NgStyle } from '@angular/common';
import { VehicleType } from '../../model/vehicle.entity';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [BaseFormComponent, MatIconModule, MatIconButton, NgStyle],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
})
export class VehicleDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  vehiclesService = inject(VehiclesService);
  vehicle?: VehicleType;
  image?: string;

  fields: BaseFormField[] = [];
  async ngOnInit() {
    const { paramMap, data } = this.route.snapshot;
    const vehicleId = paramMap.get('id') ?? '';
    const isNewVehicle = data['mode'] === 'new-vehicle';

    if (vehicleId && !isNewVehicle) {
      this.vehicle = (
        await lastValueFrom(this.vehiclesService.find({ id: vehicleId }))
      )?.[0];

      this.image = this.vehicle.images?.[0];
    } else {
      this.image = `/assets/vehicle-${Math.floor(Math.random() * 3 + 1)}.jpeg`;
    }

    this.fields = [
      {
        formControlName: 'brand',
        placeholder: 'Brand',
        type: 'text',
        required: true,
        value: this.vehicle?.brand,
      },
      {
        formControlName: 'model',
        placeholder: 'Model',
        type: 'text',
        required: true,
        value: this.vehicle?.model,
      },
      {
        formControlName: 'price',
        placeholder: 'Price For Rent',
        type: 'text',
        required: true,
        value: this.vehicle?.price,
      },
      {
        formControlName: 'plate',
        placeholder: 'Plate',
        type: 'text',
        required: true,
        value: this.vehicle?.plate,
      },
      {
        formControlName: 'color',
        placeholder: 'Color',
        type: 'text',
        required: true,
        value: this.vehicle?.color,
      },
    ];
  }

  saveVehicle(data: any) {
    data.images = this.vehicle?.images ?? [this.image];

    if (this.vehicle?.id) {
      this.vehiclesService.update(this.vehicle.id, data).subscribe((res) => {
        this.router.navigateByUrl('/dashboard/vehicles');
      });
    } else {
      this.vehiclesService.create(data).subscribe((res) => {
        this.router.navigateByUrl('/dashboard/vehicles');
      });
    }
  }

  goBack() {
    history.back();
  }
}
