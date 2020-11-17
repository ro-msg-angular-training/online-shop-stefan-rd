import { Injectable } from '@angular/core';
import { ProductWithQuantity } from '../models/product-with-quantity';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private productsInCart: Array<ProductWithQuantity> = [
    {
      product: {
        id: 1,
        name: 'Product 1',
        category: 'Category 1',
        price: 1,
        image: 'Image',
        description: 'Description',
        currentQuantity: 10,
      },
      quantity: 2,
    },
    {
      product: {
        id: 2,
        name: 'Product 2',
        category: 'Category 1',
        price: 10,
        image: 'Image',
        description: 'Description',
        currentQuantity: 10,
      },
      quantity: 2,
    },
    {
      product: {
        id: 3,
        name: 'Product 3',
        category: 'Category 2',
        price: 5,
        image: 'Image',
        description: 'Description',
        currentQuantity: 10,
      },
      quantity: 2,
    },
    {
      product: {
        id: 4,
        name: 'Product 4',
        category: 'Category 2',
        price: 50,
        image: 'Image',
        description: 'Description',
        currentQuantity: 10,
      },
      quantity: 2,
    },
    {
      product: {
        id: 5,
        name: 'Product 5',
        category: 'Category 3',
        price: 100,
        image: 'Image',
        description: 'Description',
        currentQuantity: 10,
      },
      quantity: 2,
    },
  ];

  constructor(private messageService: MessageService) {}

  public getProductsFromCart(): Observable<Array<ProductWithQuantity>> {
    this.messageService.add(
      'OrderService: Fetched the products that are in the cart.'
    );
    return of(this.productsInCart);
  }
}
