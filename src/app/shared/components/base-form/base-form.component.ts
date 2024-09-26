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
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { Router } from '@angular/router';

export type BaseFormField = {
  type: 'text' | 'password' | 'email' | 'checkbox' | 'radio-button';
  placeholder?: string;
  label?: string;
  formControlName: string;
  value?: string;
  required?: boolean;
  options?: string[]
};
@Component({
  selector: 'app-base-form',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatCheckbox,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatButton,
    CommonModule,
    MatRadioButton,
    MatRadioGroup
  ],
  templateUrl: './base-form.component.html',
  styleUrl: './base-form.component.css',
})
export class BaseFormComponent implements OnInit {
  @Input() title?: string = '';
  @Input({ required: true }) fields?: BaseFormField[];
  @Output() onSubmit = new EventEmitter();
  @Input() error?: string;
  form!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);

  ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};
    this.fields?.forEach((field) => {
      const validators = [];
      if (field.required) validators.push(Validators.required);
      if (field.type === 'email') validators.push(Validators.email);
      formGroup[field.formControlName] = new FormControl(
        field?.value ?? '',
        validators
      );
    });
    this.form = this.fb.group(formGroup);

    this.form.valueChanges.subscribe(() => {
      console.log(this.form?.errors);
    });
  }

  checkForErrorsIn(formControlName: string): string {
    // TODO use pipes or subscribers to make more performant
    const formControl = this.form?.get(formControlName);
    if (!formControl || !formControl.touched) return '';

    const {required, email} = formControl.errors || {}
    if (required) {
      return 'Field is required'
    }
    else if (email) {
      return 'Field should be valid email'
    }
    else {
      console.log(formControl.errors)
    }
    return '';
  }
  handleSubmit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form?.value);
    } else {
      this.form?.markAllAsTouched();
      console.log(this.form.errors, this.form)
    }
  }
}
