import { Product } from '../models/product.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Array<Product> = [
    {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      price: 1,
      image: 'Image',
      description: 'Description',
      currentQuantity: 10,
    },
    {
      id: 2,
      name: 'Product 2',
      category: 'Category 1',
      price: 10,
      image: 'Image',
      description: 'Description',
      currentQuantity: 10,
    },
    {
      id: 3,
      name: 'Product 3',
      category: 'Category 2',
      price: 5,
      image: 'Image',
      description: 'Description',
      currentQuantity: 10,
    },
    {
      id: 4,
      name: 'Product 4',
      category: 'Category 2',
      price: 50,
      image: 'Image',
      description: 'Description',
      currentQuantity: 10,
    },
    {
      id: 5,
      name: 'Product 5',
      category: 'Category 3',
      price: 100,
      image: 'Image',
      description: 'Description',
      currentQuantity: 10,
    },
  ];

  constructor(private messageService: MessageService) {}

  public getProducts(): Observable<Array<Product>> {
    this.messageService.add('ProductService: Fetched the products.');
    return of(this.products);
  }

  getProduct(id: number): Observable<Product> {
    const product: Product = this.products.find((product) => product.id === id);
    if (product) {
      return of(product);
    }
    throw new Error('There is no product with the given id: ' + id);
  }
}
