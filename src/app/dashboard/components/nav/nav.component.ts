import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '../../../auth/services/auth.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterLinkActive,
    RouterLink,
    MatMenuTrigger,
    MatMenu,
    MatIconButton,
    TranslateModule,
  ],
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  auth = inject(AuthService);
  menuOptions = [
    { label: 'NAV.VEHICLES', path: './vehicles' },
    { label: 'NAV.INVOICES', path: './invoices' },
    { label: 'NAV.PROFILE', path: './profile' },
    { label: 'NAV.SUPPORT', path: './support' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor() {
    console.log(this.auth.user)
    if (this.auth.user.role === 'customer') {
      this.menuOptions.unshift({ label: 'NAV.HOME', path: './home' });
    }
  }

  handleLogOut() {
    this.auth.logOut();
  }
}
