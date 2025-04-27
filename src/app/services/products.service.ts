import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'https://fakestoreapi.com/products';
  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {}

  async fetchAllProducts(): Promise<void> {
    const products = await this.http.get<Product[]>(this.baseUrl).toPromise();
    if (products) {
      this.products.set(products);
    } else {
      console.error('Failed to fetch all products.');
    }
  }

  async fetchProductsByCategory(category: string): Promise<void> {
    const products = await this.http
      .get<Product[]>(`${this.baseUrl}/category/${category}`)
      .toPromise();
    if (products) {
      this.products.set(products);
    } else {
      console.error('Failed to fetch products: products is undefined');
    }
  }
}
