import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductWithQuantity } from 'src/app/models/product-with-quantity';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  processingOrder: boolean = false;
  productsInCart: Array<ProductWithQuantity>;
  maxQuantityPerOrder: number;
  lastOrder: Order;
  placeOrderSubscription: Subscription;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProductsInCart();
    this.getMaxQuantityPerOrder();
  }

  ngOnDestroy(): void {
    if (!!this.placeOrderSubscription) {
      this.placeOrderSubscription.unsubscribe();
    }
  }

  getMaxQuantityPerOrder() {
    this.maxQuantityPerOrder = this.orderService.getMaxQuantityPerOrder();
  }

  onRemove(productWithQuantity: ProductWithQuantity): void {
    this.orderService.removeProductFromCart(productWithQuantity.product._id);
    this.getProductsInCart();
  }

  getProductsInCart(): void {
    this.productsInCart = this.orderService.getProductsFromCart();
  }

  placeOrder(): void {
    this.processingOrder = true;
    this.placeOrderSubscription = this.orderService
      .placeOrder()
      .subscribe(
        (order: Order) => {
          this.lastOrder = order;
          this.toastr.success(
            'Order ' + order._id.toString() + ' was placed successfully!',
            'SUCCESS'
          );
        },
        (error: HttpErrorResponse) => {
          this.toastr.error(error.error, 'ERROR');
        }
      )
      .add(() => {
        this.processingOrder = false;
      });
  }

  updateCartQuantity(): void {
    this.orderService.updateCartQuantity(this.productsInCart);
  }
}
