import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `<div
      class="flex flex-wrap gap-3 p-6 mx-auto max-w-4xl justify-center"
    >
      <button [class]="getButtonClasses('all')" (click)="selectCategory('all')">
        All Products
      </button>

      @for (cat of categories; track $index) {
      <button [class]="getButtonClasses(cat)" (click)="selectCategory(cat)">
        {{ cat }}
      </button>
      }
    </div>

    <div
      class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto max-w-7xl"
    >
      @for (product of productsService.products(); track product.id) {
      <app-product-card [product]="product" />
      }
    </div>`,
})
export class ProductsListComponent {
  productsService = inject(ProductsService);
  categories = [
    "men's clothing",
    "women's clothing",
    'jewelery',
    'electronics',
  ];
  selectedCategory = signal<string>('all');

  async ngOnInit() {
    await this.productsService.fetchAllProducts();
  }

  async selectCategory(category: string) {
    this.selectedCategory.set(category);
    if (category === 'all') {
      await this.productsService.fetchAllProducts();
    } else {
      await this.productsService.fetchProductsByCategory(category);
    }
  }

  getButtonClasses(category: string): string {
    const baseClasses =
      'px-4 py-2 rounded-full font-medium text-sm transition-all duration-200 ease-in-out shadow-sm';
    const activeClasses = 'bg-blue-600 text-white shadow-md';
    const inactiveClasses = 'bg-gray-100 text-gray-700 hover:bg-gray-200';

    return `${baseClasses} ${
      this.selectedCategory() === category ? activeClasses : inactiveClasses
    }`;
  }

  products = signal<Product[]>([]);
}
