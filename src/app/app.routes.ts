import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'signin',
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'signin', component: SigninComponent },
      {
        path: 'signup',
        component: SignupComponent,
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', component: ProductsListComponent },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];
