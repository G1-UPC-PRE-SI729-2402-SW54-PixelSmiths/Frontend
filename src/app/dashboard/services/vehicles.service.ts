import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService extends BaseService<any> {
  constructor() {
    super();
    this.resourceEndPoint = '/vehicles'
  }
}
