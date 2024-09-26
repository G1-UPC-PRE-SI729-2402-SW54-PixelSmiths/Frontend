import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BaseService } from '../../shared/services/base.service';
import { lastValueFrom } from 'rxjs';

const loginKey = 'isLoggedIn';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService<any> {
  router = inject(Router);
  private isAuthenticated = false;
  private redirectUrl: string | null = null;
  public user: any;

  constructor() {
    super();
    this.validateSavedUser();
    this.resourceEndPoint = '/users';
  }

  async loginUser({ email, password }: any) {
    const user = await lastValueFrom(this.find({ email, password }));

    if (user.length) {
      this.setLoggedUser(JSON.stringify(user[0]));
      this.user = user[0];
      this.isAuthenticated = true;
      this.router.navigateByUrl(
        this.user.role === 'owner' ? '/dashboard/vehicles' : '/dashboard'
      );
    } else throw new Error('Usuario no existente');
  }

  validateSavedUser() {
    const savedUser = localStorage.getItem(loginKey);
    if (savedUser) {
      this.user = JSON.parse(savedUser);
      this.isAuthenticated = true;
    }
  }

  setLoggedUser(user: string) {
    localStorage.setItem(loginKey, user);
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  logOut() {
    localStorage.removeItem(loginKey);
    this.isAuthenticated = false;
    this.router.navigateByUrl('/sign-in');
  }
}
