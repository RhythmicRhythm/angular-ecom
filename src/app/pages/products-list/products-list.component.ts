import { Component, inject, signal } from '@angular/core';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-products-list',
  imports: [ProductCardComponent],
  template: `<div
    class="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-6xl"
  >
    @for (product of productsService.products(); track product.id) {
    <app-product-card [product]="product" />
    }
  </div>`,
})
export class ProductsListComponent {
  productsService = inject(ProductsService);

  ngOnInit() {
    this.productsService.fetchAllProducts();
  }
  products = signal<Product[]>([]);
}
