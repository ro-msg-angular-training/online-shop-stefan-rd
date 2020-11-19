import { Product } from '../models/product.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiBaseUrl = environment.apiUrl;
  private productsUrl = '/products';

  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      this.apiBaseUrl + this.productsUrl
    );
  }

  getProduct(id: number): Observable<Product> {
    const productsUrlWithId = this.productsUrl + '/' + id;
    return this.httpClient.get<Product>(this.apiBaseUrl + productsUrlWithId);
  }

  deleteProduct(id: number): Observable<Product> {
    const productsUrlWithId = this.productsUrl + '/' + id;
    return this.httpClient.delete<Product>(this.apiBaseUrl + productsUrlWithId);
  }
}
