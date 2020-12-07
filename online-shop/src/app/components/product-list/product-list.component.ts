import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { Role } from 'src/app/models/role.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public products: Array<Product>;

  getProductsSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService
  ) {}

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

  isAdmin(): boolean {
    const currentUserRole: Role = this.authenticationService.getCurrentUserRole();
    return currentUserRole === 'Admin';
  }
}
