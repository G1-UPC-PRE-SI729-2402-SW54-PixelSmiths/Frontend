import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  BaseFormComponent,
  BaseFormField,
} from '../../../shared/components/base-form/base-form.component';
import { AuthService } from '../../../auth/services/auth.service';
import { UserServiceService } from '../../services/user-service.service';
import { MatIconButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, BaseFormComponent, MatIconButton],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  authService = inject(AuthService);
  fields?: BaseFormField[] = undefined;
  userService = inject(UserServiceService);
  snackbar = inject(MatSnackBar);

  ngOnInit(): void {
    const user = this.authService.user;
    this.fields = [
      {
        formControlName: 'email',
        placeholder: 'Email',
        type: 'email',
        required: true,
        value: user.email,
      },
      {
        formControlName: 'name',
        placeholder: 'Name',
        type: 'text',
        required: true,
        value: user.name,
      },
      {
        formControlName: 'password',
        placeholder: 'Password',
        type: 'password',
        required: true,
        value: user.password,
      },
    ];
  }

  goBack() {
    history.back();
  }
  saveProfile(data: any) {
    this.userService.update(this.authService.user.id, data).subscribe((res) => {
      this.snackbar.open('Usuario actualizado', undefined, {duration: 1000});
    });
  }
}
