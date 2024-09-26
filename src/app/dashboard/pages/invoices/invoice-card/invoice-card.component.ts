import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {
  MatCell,
  MatHeaderCell,
  MatHeaderRow,
  MatRow,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from '@angular/material/table';
import {InvoicesService} from "../services/invoices.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {Invoice} from "../../../../model/invoice.entity";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    FormsModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSlideToggleModule

  ],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.css'
})
export class InvoiceCardComponent implements OnInit, AfterViewInit{
  invoices: MatTableDataSource<Invoice>;
  displayedColumns: string[] = ['number', 'issue_date', 'total', 'status', 'delete','edit'];
  @ViewChild('filterInput') filterInput!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private invoiceService: InvoicesService,
              private router: Router) {
    this.invoices = new MatTableDataSource<Invoice>();
  }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices(): void {
    this.invoiceService.getAll().subscribe((response: any) => {
      this.invoices = new MatTableDataSource(response);
      this.invoices.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.invoices.paginator = this.paginator;
  }

  preview(numberId: string): void {
    this.router.navigate(['/dashboard/invoice-preview', numberId]);
  }

  applyFilter() {
    const filterValue = this.filterInput.nativeElement.value;
    if (filterValue) {
      this.invoices.filter = filterValue.trim().toLowerCase();
    } else {
      this.invoices.filter = '';
    }
  }

  deleteInvoice(invoiceId: string): void {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.delete(invoiceId).subscribe(() => {
        this.getInvoices();
      });
    }
  }

  editInvoice(invoice: Invoice): void {
    if (confirm('Are you sure you want to change the status of this invoice?')) {
      if (invoice.paymentState === 'Paid') {
        invoice.paymentState = 'Unpaid';
      } else {
        invoice.paymentState = 'Paid';
      }

      this.invoiceService.update(invoice.id, invoice).subscribe(updatedInvoice => {
        console.log('Updated invoice', updatedInvoice);
      });
    }
  }
}
