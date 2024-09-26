import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  promotionBannerUrl?: string;
  ngOnInit(): void {
    this.promotionBannerUrl= `/assets/promo-banner-${Math.floor(Math.random() * 2 + 1)}.jpeg`;
  }
}
