import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {InvoiceCardComponent} from "./invoice-card/invoice-card.component";

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    InvoiceCardComponent
  ],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.css'
})
export class InvoicesComponent {
  constructor(private router: Router) { }
  addInvoice(): void {
    this.router.navigate(['dashboard/add-invoice']);
  }
}
