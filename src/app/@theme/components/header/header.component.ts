import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from '@nebular/theme';

import { UserData, User } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { Usuario } from 'src/app/auth/usuario';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;

  user!: User; 

  usuario!: Usuario;

  themes = [
    {
      value: 'default',
      name: 'Claro',
    },
    {
      value: 'dark',
      name: 'Oscuro',
    },
    {
      value: 'cosmic',
      name: 'Cosmico',
    },
    {
      value: 'corporate',
      name: 'Empresa',
    },
  ];

  currentTheme = 'default';

  userMenu = [{ icon: 'log-out-outline', title: 'Cerrar Sesion',  }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    public authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$)
      )
      .subscribe((themeName) => (this.currentTheme = themeName));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  logout(): void {
    let username = this.authService.usuario.nombre;
    this.authService.logout();
    swal.fire('Logout', `Adios ${username}, has cerrado sesion correctamente`, 'success');
    this.router.navigate(['./auth/login']);
  }
}
