import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgIf,
    MatButton,
    MatInput,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  @Input() error?: string;
  @Output() submitEM = new EventEmitter();
  mode: 'sign-in' | 'sign-up';
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  authService = inject(AuthService);

  submit() {
    if (!this.form.valid) return;

    if (this.mode === 'sign-up') {
      this.authService.create(this.form.value).subscribe((res) => {
        console.log({ res });
        this.router.navigateByUrl('/sign-in');
      });
    } else if (this.mode === 'sign-in') {
      this.authService.loginUser(this.form.value).catch((error) => {
        this.error = error;
      });
    }
  }

  constructor() {
    this.mode = this.activatedRoute.snapshot.data['mode'];
  }
}
