import { Injectable } from '@angular/core';
import { ProductWithQuantity } from '../models/product-with-quantity';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private productsInCart: Array<ProductWithQuantity>;
  private maxQuantityPerOrder: number = 10;

  constructor() {
    this.productsInCart = [];
  }

  public getProductsFromCart(): Observable<Array<ProductWithQuantity>> {
    return of(this.productsInCart);
  }

  removeProductFromCart(id: number): void {
    const index: number = this.productsInCart.findIndex(
      (productInCart) => productInCart.product._id == id
    );
    if (index > -1) {
      this.productsInCart.splice(index, 1);
    }
  }

  addProductToCart(product: Product): void {
    const index: number = this.productsInCart.findIndex(
      (productInCart) => productInCart.product._id == product._id
    );
    if (index > -1) {
      if (this.productsInCart[index].quantity < this.maxQuantityPerOrder) {
        this.productsInCart[index].quantity =
          +this.productsInCart[index].quantity + 1;
      }
    } else {
      this.productsInCart.push({ product: product, quantity: 1 });
    }
  }

  getProductQuantityInCart(id: number) {
    const index: number = this.productsInCart.findIndex(
      (productInCart) => productInCart.product._id == id
    );
    if (index > -1) {
      return this.productsInCart[index].quantity;
    } else {
      return 0;
    }
  }

  getMaxQuantityPerOrder(): number {
    return this.maxQuantityPerOrder;
  }
}
