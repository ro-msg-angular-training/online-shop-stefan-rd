import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { ROUTES } from 'src/globals/routing';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  currentProduct: Product;
  getProductSubscription: Subscription;
  updateProductSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  goBack(): void {
    this.router.navigate(['../..'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  updateProduct(changedProduct: Product | undefined): void {
    if (changedProduct === undefined) {
      this.goBack();
    } else {
      changedProduct._id = this.currentProduct._id;
      this.currentProduct = changedProduct;
      this.updateProductSubscription = this.productService
        .updateProduct(this.currentProduct)
        .subscribe(
          (_) => {
            this.goBack();
            this.toastr.success(
              'The product was updated successfully!',
              'SUCCESS'
            );
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(error.error, 'ERROR');
          }
        );
    }
  }

  getProduct(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.getProductSubscription = this.productService.getProduct(id).subscribe(
      (product) => {
        this.currentProduct = product;
      },
      () => {
        this.router.navigate([ROUTES.pageNotFoundComponent], {
          skipLocationChange: true,
        });
      }
    );
  }
}
