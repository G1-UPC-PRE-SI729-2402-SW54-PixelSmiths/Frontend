import { Component } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {Invoice} from "../../../../model/invoice.entity";
import {InvoicesService} from "../services/invoices.service";
import {InvoiceCreateAndEditComponent} from "../invoice-create-and-edit/invoice-create-and-edit.component";

@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [
    InvoiceCreateAndEditComponent
  ],
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {
  invoiceData: Invoice;
  dataSource!: MatTableDataSource<any>;

  constructor(private invoiceService: InvoicesService,
              private router: Router,
              private location: Location) {
    this.invoiceData = {} as Invoice;
    this.dataSource = new MatTableDataSource<any>();
    this.getAllInvoices();
  }

  onCancel() {
    this.location.back();
  }

  private getAllInvoices() {
    this.invoiceService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      console.log('Response from server:', response);
    });
  };

  onInvoiceAdded(element: Invoice) {
    this.invoiceData = element;
    this.createInvoice();
    alert('Invoice created successfully!');
    this.router.navigate(['dashboard/invoices']);
  }

  private createInvoice() {
    this.invoiceService.create(this.invoiceData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((invoice: Invoice) => {
        return invoice;
      });
    });
  };
}
