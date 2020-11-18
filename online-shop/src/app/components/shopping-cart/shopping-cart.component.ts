import { Component, OnInit } from '@angular/core';
import { ProductWithQuantity } from 'src/app/models/product-with-quantity';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  productsInCart: Array<ProductWithQuantity>;
  maxQuantityPerOrder: number;

  constructor(private orderService: OrderService) {}

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
}
