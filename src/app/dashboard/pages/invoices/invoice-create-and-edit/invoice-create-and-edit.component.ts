import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {Invoice} from "../../../../model/invoice.entity";
import {InvoicesService} from "../services/invoices.service";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDialogModule} from "@angular/material/dialog";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {VehiclesService} from "../../../../vehicles/services/vehicles.service";
import {UsersService} from "../services/users.service";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-invoice-create-and-edit',
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
    MatSlideToggleModule,
    NgIf
  ],
  templateUrl: './invoice-create-and-edit.component.html',
  styleUrl: './invoice-create-and-edit.component.css'
})
export class InvoiceCreateAndEditComponent {
  users: any = [];
  userService = inject(UsersService);

  ngOnInit(): void {
    this.userService.getAll().subscribe((res) => {
      this.users = res as any;
    });
  }

  @Input() invoice: Invoice;
  @Input() editMode = false;
  @Output() invoiceAdded = new EventEmitter<Invoice>();
  @Output() invoiceUpdated = new EventEmitter<Invoice>();
  @Output() editCanceled = new EventEmitter();
  @ViewChild('invoiceForm', {static: false}) invoiceForm!: NgForm;
  invoices: Invoice[] = [];
  today: Date = new Date();

  // Methods
  constructor(private invoiceService: InvoicesService) {
    this.invoice = {} as Invoice;
    this.invoice.id = "";
    this.invoice.code = "";
    this.invoice.amount = "";
    this.invoice.paymentMethod = "";
    this.invoice.paymentState = "Unpaid";
    this.getInvoices();
    this.invoice.paymentDate = this.today.toISOString().split('T')[0];
  }

  getInvoices() {
    this.invoiceService.getAll().subscribe((response: any) => {
      this.invoices = response;

      // Sort invoices in descending order by code
      this.invoices.sort((a, b) => {
        if (a.code > b.code) return -1;
        if (a.code < b.code) return 1;
        return Number(a.id) - Number(b.id);
      });

      // Extract the number from the highest invoice code, convert it to an integer and add 1
      let highestNumber = parseInt(this.invoices[0].code.slice(1)) + 1;

      // Form the new invoice code
      this.invoice.code = 'F' + highestNumber.toString().padStart(7, '0');

      // Set the new invoice id to be the highest id + 1
      let highestId = Math.max(...this.invoices.map(inv => Number(inv.id)));
      this.invoice.id = (highestId + 1).toString();
    });
  }

  private resetEditState() {
    this.invoice = {} as Invoice;
    this.editMode = false;
    this.invoiceForm.resetForm();
  }

  onSubmit() {

    if (this.invoiceForm.form.valid) {
      let emitter = this.editMode ? this.invoiceUpdated : this.invoiceAdded;
      emitter.emit(this.invoice);
      console.log('Invoice Create', this.invoice)
      this.resetEditState();
    } else {
      console.error('Invalid data in form');

    }


  }

}
