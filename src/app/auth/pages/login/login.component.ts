import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  BaseFormComponent,
  BaseFormField,
} from '../../../shared/components/base-form/base-form.component';

const rand = (start: number, end: number) => {
  return Math.floor(Math.random() * start + end);
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, BaseFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  @Input() error?: string;
  @Output() submitEM = new EventEmitter();
  mode: 'sign-in' | 'sign-up';
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  fields: BaseFormField[] = [
    {
      type: 'text',
      placeholder: 'Email',
      formControlName: 'email',
    },
    { type: 'password', placeholder: 'Password', formControlName: 'password' },
  ];
  authService = inject(AuthService);

  imageUrl?: string;

  handleLogin(formValue: any) {
    if (this.mode === 'sign-up') {
      this.authService.create(formValue).subscribe((res) => {
        this.router.navigateByUrl('/sign-in');
      });
    } else if (this.mode === 'sign-in') {
      this.authService.loginUser(formValue).catch((error) => {
        this.error = error;
      });
    }
  }

  constructor() {
    this.mode = this.activatedRoute.snapshot.data['mode'] ?? 'sign-in';
  }
  ngOnInit(): void {
    if (this.authService.getIsAuthenticated()) {
      this.router.navigateByUrl('/dashboard')
    }
    this.imageUrl = `/assets/login-${Math.floor(Math.random()*3 + 1)}.avif`;
  }
}
