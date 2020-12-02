import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { OrderService } from 'src/app/services/order.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES } from 'src/globals/routing';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  getProductSubscription: Subscription;
  deleteProductSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    if (!!this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
    if (!!this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
  }

  getProduct(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.getProductSubscription = this.productService.getProduct(id).subscribe(
      (product) => {
        this.product = product;
      },
      () => {
        this.router.navigate([ROUTES.pageNotFoundComponent], {
          skipLocationChange: true,
        });
      }
    );
  }

  goBack(): void {
    this.router.navigate(['..'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  addToCart(): void {
    this.orderService.addProductToCart(this.product);
  }

  checkProductQuantityInCart(): boolean {
    return (
      this.orderService.getProductQuantityInCart(this.product._id) >=
      this.orderService.getMaxQuantityPerOrder()
    );
  }

  deleteProduct(): void {
    this.deleteProductSubscription = this.productService
      .deleteProduct(this.product._id)
      .subscribe((deletedProduct) => {
        console.log(deletedProduct);
        this.goBack();
        this.toastr.success('The product was deleted successfully!', 'SUCCESS');
      });
  }
}
