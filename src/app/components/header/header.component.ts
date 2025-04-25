import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router } from '@angular/router';
import { CommonModule, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, CommonModule, AsyncPipe],
  template: ` <header
    class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 shadow-lg"
  >
    <div class="container mx-auto flex items-center justify-between">
      <!-- Logo and Store Name -->
      <a routerLink="/" class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          class="w-8 h-8 text-white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <span class="text-xl font-bold text-white">Rhythmic Store</span>
      </a>

      <!-- Navigation Menu -->
      <nav class="hidden md:flex items-center space-x-4">
        <a
          routerLink="/products"
          class="text-white hover:text-indigo-200 transition"
          >Products</a
        >
        <a
          routerLink="/deals"
          class="text-white hover:text-indigo-200 transition"
          >Deals</a
        >
        <a
          routerLink="/about"
          class="text-white hover:text-indigo-200 transition"
          >About</a
        >
      </nav>

      <!-- User Actions -->
      <div class="flex items-center gap-4">
        <!-- Cart Button -->
        <app-primary-button
          [label]="'Cart (' + cartService.cart().length + ')'"
          routerLink="/cart"
          class="bg-white text-indigo-700 hover:bg-indigo-100"
        />

        <!-- User Profile/Logout -->
        <div class="relative" *ngIf="authService.isAuthenticated()">
          <div class="flex items-center gap-2">
            <span class="text-white hidden md:inline"> Rhythm </span>
            <button
              (click)="handleLogout()"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition flex items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="w-5 h-5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>

        <!-- Login Button (shown when not logged in) -->
        <app-primary-button
          *ngIf="!authService.isAuthenticated()"
          [label]="'Login'"
          routerLink="/login"
          class="bg-white text-indigo-700 hover:bg-indigo-100"
        />
      </div>
    </div>
  </header>`,
  styles: ``,
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);

  handleLogout() {
    console.log('Logout button clicked');
    
    // Subscribe to the logout observable to actually trigger the HTTP request
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        // Navigate to home or login page after logout
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}
