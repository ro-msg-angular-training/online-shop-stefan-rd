import { Injectable } from '@angular/core';
import { ProductWithQuantity } from '../models/product-with-quantity';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order.model';
import { Address } from '../models/address.model';
import { ENDPOINTS } from 'src/globals/endpoints';
import { MAX_QUANTITY_PER_ORDER } from 'src/globals/constants';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  public getProductsFromCart(): Array<ProductWithQuantity> {
    if (localStorage.getItem('itemsInCart') === null) {
      localStorage.setItem('itemsInCart', JSON.stringify([]));
      return [];
    } else {
      return JSON.parse(localStorage.getItem('itemsInCart'));
    }
  }

  removeProductFromCart(id: number): void {
    const productsInCart = this.getProductsFromCart();
    const index: number = productsInCart.findIndex(
      (productInCart) => productInCart.product._id == id
    );
    if (index > -1) {
      productsInCart.splice(index, 1);
    }
    localStorage.setItem('itemsInCart', JSON.stringify(productsInCart));
  }

  addProductToCart(product: Product): void {
    const productsInCart = this.getProductsFromCart();
    const index: number = productsInCart.findIndex(
      (productInCart) => productInCart.product._id == product._id
    );
    if (index > -1) {
      if (productsInCart[index].quantity < MAX_QUANTITY_PER_ORDER) {
        productsInCart[index].quantity = +productsInCart[index].quantity + 1;
        localStorage.setItem('itemsInCart', JSON.stringify(productsInCart));
      }
    } else {
      productsInCart.push({ product: product, quantity: 1 });
      localStorage.setItem('itemsInCart', JSON.stringify(productsInCart));
    }
  }

  getProductQuantityInCart(id: number) {
    const productsInCart = this.getProductsFromCart();
    const index: number = productsInCart.findIndex(
      (productInCart) => productInCart.product._id == id
    );
    if (index > -1) {
      return productsInCart[index].quantity;
    } else {
      return 0;
    }
  }

  getMaxQuantityPerOrder(): number {
    return MAX_QUANTITY_PER_ORDER;
  }

  placeOrder(): Observable<Order> {
    const productsInCart = this.getProductsFromCart();
    const timestamp: Date = new Date();
    const address: Address = {
      country: 'Romania',
      county: 'Cluj',
      city: 'Cluj-Napoca',
      streetAddress: '4 Strada Bucuresti',
    };
    const productIdsAndQuantities = {};
    for (let productInCart of productsInCart) {
      productIdsAndQuantities[productInCart.product._id] =
        productInCart.quantity;
    }
    const informationAboutOrder = {
      timestamp: timestamp,
      address: address,
      productIdsAndQuantities: productIdsAndQuantities,
    };
    return this.httpClient.post<Order>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.orders,
      informationAboutOrder
    );
  }

  updateCartQuantity(productsInCart: ProductWithQuantity[]) {
    localStorage.setItem('itemsInCart', JSON.stringify(productsInCart));
  }
}
