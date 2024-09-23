import { validateHorizontalPosition } from '@angular/cdk/overlay';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { VehiclesService } from '../../services/vehicles.service';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    MatGridListModule,
    MatCardModule,
    MatMenuTrigger,
    MatIcon,
    MatMenu,
    MatButton,
    MatIconButton,
    MatMenuItem,
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css',
})
export class VehiclesComponent implements OnInit {
  vehicles: any = [];
  vehiclesService = inject(VehiclesService);

  ngOnInit(): void {
    this.vehiclesService.getAll().subscribe((res) => {
      this.vehicles = res as any;
    });
  }
}
