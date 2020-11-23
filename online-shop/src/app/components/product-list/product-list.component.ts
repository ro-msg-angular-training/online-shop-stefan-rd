import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: Array<Product>;

  getProductsSubscription: Subscription;

  constructor(private productService: ProductService) {}

  getProducts(): void {
    this.productService
      .getProducts()
      .subscribe((products) => (this.products = products));
  }

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    if (!!this.getProductsSubscription) {
      this.getProductsSubscription.unsubscribe();
    }
  }
}
