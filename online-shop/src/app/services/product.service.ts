import { Product } from '../models/product.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from 'src/globals/endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.products
    );
  }

  getProduct(id: number): Observable<Product> {
    return this.httpClient.get<Product>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.products + '/' + id.toString()
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.httpClient.delete<Product>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.products + '/' + id.toString()
    );
  }
}
