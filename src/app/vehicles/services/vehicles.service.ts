import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { VehicleType } from '../model/vehicle.entity';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends BaseService<VehicleType> {
  constructor() {
    super();
    this.resourceEndPoint = '/vehicles'
  }
}
