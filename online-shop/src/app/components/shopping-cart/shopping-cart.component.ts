import { Component, OnInit } from '@angular/core';
import { ProductWithQuantity } from 'src/app/models/product-with-quantity';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  processingOrder: boolean = false;
  productsInCart: Array<ProductWithQuantity>;
  maxQuantityPerOrder: number;
  lastOrder: Order;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.getProductsInCart();
    console.log(this.productsInCart);
    this.getMaxQuantityPerOrder();
  }
  getMaxQuantityPerOrder() {
    this.maxQuantityPerOrder = this.orderService.getMaxQuantityPerOrder();
  }

  onRemove(productWithQuantity: ProductWithQuantity): void {
    console.log(productWithQuantity);
    this.orderService.removeProductFromCart(productWithQuantity.product._id);
  }

  getProductsInCart(): void {
    this.orderService
      .getProductsFromCart()
      .subscribe((products) => (this.productsInCart = products));
  }

  placeOrder(): void {
    this.processingOrder = true;
    this.orderService
      .placeOrder()
      .subscribe((order) => {
        this.lastOrder = order;
      })
      .add(() => {
        this.processingOrder = false;
      });
  }

  updateCartQuantity(): void {
    localStorage.setItem('itemsInCart', JSON.stringify(this.productsInCart));
  }
}
