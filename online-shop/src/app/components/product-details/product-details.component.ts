import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.productService
      .getProduct(id)
      .subscribe((product) => (this.product = product));
  }

  goBack(): void {
    this.location.back();
  }
}
