import { Component, OnInit } from '@angular/core';
import { ProductWithQuantity } from 'src/app/models/product-with-quantity';
import { MessageService } from 'src/app/services/message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  productsInCart: Array<ProductWithQuantity>;

  constructor(
    public messageService: MessageService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getProductsInCart();
  }

  onDelete(productWithQuantity: ProductWithQuantity): void {
    console.log(productWithQuantity);
    this.messageService.add(
      `ShoppingCartComponent: Removed product with id=${productWithQuantity.product.id} and quantity ${productWithQuantity.quantity}`
    );
    const index: number = this.productsInCart.findIndex(
      (productInCart) =>
        productInCart.product.id == productWithQuantity.product.id
    );
    if (index > -1) {
      this.productsInCart.splice(index, 1);
    }
  }

  getProductsInCart(): void {
    this.orderService
      .getProductsFromCart()
      .subscribe((products) => (this.productsInCart = products));
  }
}
