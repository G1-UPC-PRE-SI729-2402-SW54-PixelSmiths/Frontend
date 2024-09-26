import { CommonModule, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

export type BaseFormField = {
  type: string;
  placeholder?: string;
  formControlName: string;
  value?: string;
  required?: boolean;
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
    CommonModule
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css',
})
export class BaseFormComponent implements OnInit {
  @Input() title?: string = '';
  @Input({ required: true }) fields?: BaseFormField[];
  @Output() onSubmit = new EventEmitter();
  @Input() error?: string;
  form?: FormGroup;
  router = inject(Router);

  ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};
    this.fields?.forEach((field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      formGroup[field.formControlName] = new FormControl(
        field?.value ?? '',
        validators
      );
    });
    this.form = new FormGroup(formGroup);
  }
  handleSubmit() {
    if (this.form?.valid) {
      this.onSubmit.emit(this.form?.value);
    }
    else {
      console.log(this.form)
    }
  }
}
