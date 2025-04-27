import { Component, inject, signal, HostListener } from '@angular/core';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, RouterModule, CommonModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('300ms ease-in-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('300ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ],
  template: `
    <div class="pb-16 md:pb-20">
      <section class="fixed w-full top-0 z-50">
        <!-- Announcement Bar -->
        <div class="py-2 px-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div class="flex flex-row items-center justify-center gap-2 sm:gap-6 text-xs">
            <div class="items-center hidden sm:flex">
              <svg
                class="h-5 w-5 mr-2"
                fill="#D2122E"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-white">rhythmic&#64;store.com</span>
            </div>
            <div class="flex items-center">
              <svg
                class="h-5 w-5 mr-2"
                fill="#D2122E"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span class="text-white">+234 905 872 2003</span>
            </div>
            <div class="flex items-center">
              <svg
                class="h-5 w-5 mr-2"
                fill="#D2122E"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span class="text-white">Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        <!-- Main Navigation -->
        <div class="relative py-3 px-4 md:px-6 bg-white shadow-sm">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <a routerLink="/" class="flex-shrink-0">
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  class="w-8 h-8 text-indigo-600"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M9 18V5l12-2v13"></path>
                  <circle cx="6" cy="18" r="3"></circle>
                  <circle cx="18" cy="16" r="3"></circle>
                </svg>
                <span class="text-xl font-bold text-indigo-600">Rhythmic Store</span>
              </div>
            </a>

            <!-- Desktop Navigation Links -->
            <div class="hidden lg:flex items-center justify-center flex-1 mx-8">
              <a
                *ngFor="let link of navLinks"
                [routerLink]="link.path"
                routerLinkActive="text-indigo-600 bg-indigo-50"
                [routerLinkActiveOptions]="{exact: link.exact}"
                class="px-4 py-2 mx-2 text-sm font-medium rounded-md transition-colors duration-200 text-gray-600 hover:text-indigo-700 hover:bg-indigo-50"
              >
                {{ link.label }}
              </a>
            </div>

            <!-- Right Side Icons -->
            <div class="flex items-center">
              <!-- Cart Link -->
              <a
                routerLink="/cart"
                class="flex items-center mr-4 text-gray-600 hover:text-indigo-700 transition-colors duration-200"
              >
                <div class="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span
                    *ngIf="cartService.cart().length > 0"
                    class="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 bg-indigo-600 text-white text-xs font-medium rounded-full"
                  >
                    {{ cartService.cart().length > 99 ? '99+' : cartService.cart().length }}
                  </span>
                </div>
                <span class="hidden xl:block ml-2 text-sm">Cart</span>
              </a>

              <!-- User actions -->
              <div *ngIf="authService.isAuthenticated()" class="hidden lg:block">
                <button
                  (click)="toggleUserDropdown($event)"
                  class="flex items-center gap-2 text-gray-600 hover:text-indigo-700 transition-colors duration-200"
                >
                  <span>Rhythm</span>
                  <div class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold">
                    R
                  </div>
                </button>

                <!-- Dropdown Menu -->
                <div
                  *ngIf="isUserDropdownOpen"
                  @fadeInOut
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  style="top: 100%; right: 1rem;"
                >
                  <a routerLink="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                    Profile
                  </a>
                  <a routerLink="/orders" class="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">
                    My Orders
                  </a>
                  <div class="border-t border-gray-100"></div>
                  <button
                    (click)="handleLogout()"
                    class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              </div>

              <!-- Login Button (shown when not logged in) -->
              <app-primary-button
                *ngIf="!authService.isAuthenticated()"
                [label]="'Login'"
                routerLink="/login"
                class="hidden lg:flex bg-indigo-600 text-white hover:bg-indigo-700"
              />

              <!-- Mobile Menu Toggle -->
              <button
                (click)="toggleMobileMenu()"
                class="lg:hidden ml-2 p-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                aria-label="Open menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Mobile Menu Overlay -->
      <div
        *ngIf="isMobileMenuOpen"
        @fadeInOut
        class="fixed inset-0 bg-black bg-opacity-50 z-50"
        (click)="closeMobileMenu()"
      ></div>

      <!-- Mobile Menu Drawer -->
      <div
        *ngIf="isMobileMenuOpen"
        @slideInOut
        class="fixed top-0 right-0 bottom-0 w-full max-w-xs z-50 bg-white shadow-xl"
      >
        <div class="flex flex-col h-full">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-gray-100">
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                class="w-6 h-6 text-indigo-600"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              <span class="text-lg font-bold text-indigo-600">Rhythmic</span>
            </div>
            <button
              (click)="closeMobileMenu()"
              class="p-2 text-gray-500 hover:text-indigo-600 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Navigation Links -->
          <nav class="flex-1 overflow-y-auto p-4">
            <div class="mb-6">
              <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Main Menu
              </h3>
              <ul class="space-y-1">
                <li *ngFor="let link of navLinks">
                  <a
                    [routerLink]="link.path"
                    routerLinkActive="text-indigo-600 bg-indigo-50 font-medium"
                    [routerLinkActiveOptions]="{exact: link.exact}"
                    class="flex items-center px-3 py-3 rounded-lg transition-colors duration-200 text-gray-700 hover:text-indigo-900 hover:bg-indigo-50"
                    (click)="closeMobileMenu()"
                  >
                    <span class="mr-3" [innerHTML]="link.icon"></span>
                    {{ link.label }}
                  </a>
                </li>
              </ul>
            </div>

            <div class="mb-6">
              <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                My Account
              </h3>
              <ul class="space-y-1">
                <li>
                  <a
                    routerLink="/cart"
                    class="flex items-center px-3 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    (click)="closeMobileMenu()"
                  >
                    <div class="relative mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <span
                        *ngIf="cartService.cart().length > 0"
                        class="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-indigo-600 text-white text-xs font-medium rounded-full"
                      >
                        {{ cartService.cart().length }}
                      </span>
                    </div>
                    My Cart
                  </a>
                </li>
                
                <ng-container *ngIf="authService.isAuthenticated()">
                  <li>
                    <a
                      routerLink="/profile"
                      class="flex items-center px-3 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      (click)="closeMobileMenu()"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5 mr-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      routerLink="/orders"
                      class="flex items-center px-3 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                      (click)="closeMobileMenu()"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-5 h-5 mr-3"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      My Orders
                    </a>
                  </li>
                  <li>
                    <button
                      (click)="handleLogout()"
                      class="flex w-full items-center px-3 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        class="w-5 h-5 mr-3"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </li>
                </ng-container>
                
                <li *ngIf="!authService.isAuthenticated()">
                  <a
                    routerLink="/login"
                    class="flex items-center px-3 py-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                    (click)="closeMobileMenu()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="w-5 h-5 mr-3"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <!-- Footer -->
          <div class="p-4 border-t border-gray-100">
            <p class="text-center text-sm text-gray-500">
              © Rhythmic Store {{ currentYear }}
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  standalone: true
})
export class HeaderComponent {
  cartService = inject(CartService);
  authService = inject(AuthService);
  router = inject(Router);
  
  isMobileMenuOpen = false;
  isUserDropdownOpen = false;
  currentYear = new Date().getFullYear();
  
  navLinks = [
    { 
      path: '/', 
      label: 'Home', 
      exact: true,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>` 
    },
    { 
      path: '/products', 
      label: 'Products', 
      exact: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>` 
    },
    { 
      path: '/deals', 
      label: 'Deals', 
      exact: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>` 
    },
    { 
      path: '/about', 
      label: 'About', 
      exact: false,
      icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>` 
    }
  ];

  // Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const userDropdownClicked = (event.target as HTMLElement).closest('[data-dropdown="user"]');
    
    if (!userDropdownClicked && this.isUserDropdownOpen) {
      this.isUserDropdownOpen = false;
    }
  }
  
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
  
  toggleUserDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  handleLogout() {
    console.log('Logout button clicked');
    this.isUserDropdownOpen = false;
    this.isMobileMenuOpen = false;
    
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Logout failed:', error);
      }
    });
  }
}