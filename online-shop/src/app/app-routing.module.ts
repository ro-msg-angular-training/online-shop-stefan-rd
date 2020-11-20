import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from 'src/globals/routing';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: ROUTES.productListComponent, component: ProductListComponent },
  { path: ROUTES.shoppingCartComponent, component: ShoppingCartComponent },
  {
    path: ROUTES.root,
    redirectTo: ROUTES.productListComponent,
    pathMatch: 'full',
  },
  { path: ROUTES.productDetailsComponent, component: ProductDetailsComponent },
  { path: ROUTES.productEditComponent, component: ProductEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
