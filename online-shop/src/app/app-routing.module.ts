import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROUTES } from 'src/globals/routing';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: ROUTES.root,
    redirectTo: ROUTES.productListComponent,
    pathMatch: 'full',
  },
  { path: ROUTES.loginComponent, component: LoginComponent },
  { path: ROUTES.logoutComponent, component: LogoutComponent },
  {
    path: ROUTES.productListComponent,
    component: ProductListComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: ROUTES.shoppingCartComponent,
    component: ShoppingCartComponent,
    canActivate: [AuthenticationGuard],
    data: { roles: ['Customer'] },
  },

  {
    path: ROUTES.productSaveComponent,
    component: ProductSaveComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: ROUTES.productDetailsComponent,
    component: ProductDetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: ROUTES.productEditComponent,
    component: ProductEditComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '404',
    component: PageNotFoundComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    canActivate: [AuthenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
