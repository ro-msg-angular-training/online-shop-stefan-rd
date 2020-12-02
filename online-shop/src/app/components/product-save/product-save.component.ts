import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ROUTES } from 'src/globals/routing';

@Component({
  selector: 'product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css'],
})
export class ProductSaveComponent implements OnInit {
  currentProduct: Product = {
    _id: undefined,
    category: {
      _id: undefined,
    },
    weight: undefined,
    price: undefined,
    name: undefined,
    description: undefined,
  };
  saveProductSubscription: Subscription;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  goBack(): void {
    this.router.navigate(['..'], {
      relativeTo: this.route,
      replaceUrl: true,
    });
  }

  saveProduct(changedProduct: Product | undefined): void {
    if (changedProduct === undefined) {
      this.goBack();
    } else {
      this.currentProduct = changedProduct;
      this.saveProductSubscription = this.productService
        .saveProduct(this.currentProduct)
        .subscribe(
          (_) => {
            this.goBack();
            this.toastr.success(
              'The product was saved successfully!',
              'SUCCESS'
            );
          },
          (error: HttpErrorResponse) => {
            this.toastr.error(error.error, 'ERROR');
          }
        );
    }
  }
}
