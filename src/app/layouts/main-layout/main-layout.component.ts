import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-main-layout',
  imports: [HeaderComponent, RouterOutlet],
  template: `<app-header /> <router-outlet />`,
})
export class MainLayoutComponent {}
