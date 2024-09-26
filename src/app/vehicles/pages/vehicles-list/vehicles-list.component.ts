import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton, MatIconButton } from '@angular/material/button';
import { VehiclesService } from '../../services/vehicles.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-vehicles-list',
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
    RouterLink,
  ],
  templateUrl: './vehicles-list.component.html',
  styleUrl: './vehicles-list.component.css',
})
export class VehiclesListComponent implements OnInit {
  vehicles: any = [];
  vehiclesService = inject(VehiclesService);
  router = inject(Router);

  ngOnInit(): void {
    this.vehiclesService.getAll().subscribe((res) => {
      this.vehicles = res as any;
    });
  }

  handleNewVehicle() {
    console.log('newww');
    this.router.navigateByUrl('/dashboard/vehicles/new');
  }

  handleDelete(id: string) {
    this.vehiclesService.delete(id).subscribe((res) => {
      if (res) {
        this.vehicles = this.vehicles.filter((v: any) => v.id !== id);
      }
    });
  }
}
