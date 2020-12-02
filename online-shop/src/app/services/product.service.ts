import { Product } from '../models/product.model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ENDPOINTS } from 'src/globals/endpoints';
import {
  mapProductToSaveDto,
  mapProductToUpdateDto,
} from '../mappers/product-mapper';
import { ProductUpdateDto } from '../DTOs/product-update-dto';
import { ProductSaveDto } from '../dtos/product-save-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<Array<Product>> {
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

  updateProduct(product: Product): Observable<any> {
    const updateDto: ProductUpdateDto = mapProductToUpdateDto(product);
    console.log(updateDto);
    return this.httpClient.put<ProductUpdateDto>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.products,
      updateDto,
      this.httpOptions
    );
  }

  saveProduct(product: Product): Observable<any> {
    const saveDto: ProductSaveDto = mapProductToSaveDto(product);
    console.log(saveDto);
    return this.httpClient.post<ProductSaveDto>(
      ENDPOINTS.baseUrl + '/' + ENDPOINTS.products,
      saveDto,
      this.httpOptions
    );
  }
}
