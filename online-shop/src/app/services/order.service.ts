import { Injectable } from '@angular/core';
import { ProductWithQuantity } from '../models/product-with-quantity';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiBaseUrl = environment.apiUrl;
  private ordersUrl = '/orders';
  private productsInCart: Array<ProductWithQuantity> = [];
  private maxQuantityPerOrder: number = 10;

  constructor(private httpClient: HttpClient) {
    this.getCartFromLocalStorage();
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
    localStorage.setItem('itemsInCart', JSON.stringify(this.productsInCart));
  }

  addProductToCart(product: Product): void {
    const index: number = this.productsInCart.findIndex(
      (productInCart) => productInCart.product._id == product._id
    );
    if (index > -1) {
      if (this.productsInCart[index].quantity < this.maxQuantityPerOrder) {
        this.productsInCart[index].quantity =
          +this.productsInCart[index].quantity + 1;
        localStorage.setItem(
          'itemsInCart',
          JSON.stringify(this.productsInCart)
        );
      }
    } else {
      this.productsInCart.push({ product: product, quantity: 1 });
      localStorage.setItem('itemsInCart', JSON.stringify(this.productsInCart));
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

  placeOrder(): Observable<Order> {
    const timestamp: Date = new Date();
    const address: Address = {
      country: 'Romania',
      county: 'Cluj',
      city: 'Cluj-Napoca',
      streetAddress: '4 Strada Bucuresti',
    };
    const productIdsAndQuantities = {};
    for (let productInCart of this.productsInCart) {
      productIdsAndQuantities[productInCart.product._id] =
        productInCart.quantity;
    }
    const informationAboutOrder = {
      timestamp: timestamp,
      address: address,
      productIdsAndQuantities: productIdsAndQuantities,
    };
    return this.httpClient.post<Order>(
      this.apiBaseUrl + this.ordersUrl,
      informationAboutOrder
    );
  }

  getCartFromLocalStorage(): void {
    if (localStorage.getItem('itemsInCart') === null) {
      localStorage.setItem('itemsInCart', JSON.stringify([]));
    } else {
      this.productsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
    }
  }
}
