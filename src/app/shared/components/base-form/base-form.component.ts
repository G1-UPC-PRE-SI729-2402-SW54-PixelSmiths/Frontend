import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

export type BaseFormField = {
  type: string;
  placeholder?: string;
  formControlName: string;
  value?: string;
};
@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatButton,
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css',
})
export class BaseFormComponent implements OnInit {
  @Input() title?: string = '';
  @Input({ required: true }) fields?: BaseFormField[];
  @Output() onSubmit = new EventEmitter();
  form?: FormGroup;

  error?: string;

  ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};
    this.fields?.forEach((field) => {
      formGroup[field.formControlName] = new FormControl(field?.value ?? '');
    });
    this.form = new FormGroup(formGroup);
  }
  handleSubmit() {
    if (this.form?.valid) {
      this.onSubmit.emit(this.form?.value);
    }
  }
}
