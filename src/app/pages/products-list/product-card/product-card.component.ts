import { Component, inject, input } from '@angular/core';
import { Product } from '../../../models/products.model';
import { PrimaryButtonComponent } from '../../../components/primary-button/primary-button.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent],
  template: `<div class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col relative">
  <div class="w-full flex justify-center mb-4">
    <img
      [src]="product().image"
      alt=""
      class="w-[180px] h-[120px] object-contain"
    />
  </div>
  <div class="flex flex-col">
    <span class="text-lg font-semibold text-gray-800 line-clamp-2 min-h-[3rem]">{{ product().title }}</span>
    <span class="text-lg font-bold text-gray-900 mt-2">{{ product().price }}</span>
    <app-primary-button 
      label="Add to Cart" 
      class="mt-4" 
     
      (btnClicked)="cartService.addToCart(product())" 
    />
  </div>
  <span
    class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium"
    [class]="product().stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
  >
    @if (product().stock) {
    {{ product().stock }} left }@else { Out of Stock }
  </span>
</div>`,
  styles: ``,
})
export class ProductCardComponent {
  cartService = inject(CartService);

  product = input.required<Product>();
}
