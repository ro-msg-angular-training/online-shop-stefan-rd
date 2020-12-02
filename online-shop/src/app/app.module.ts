import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AddressPipe } from './pipes/address.pipe';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductSaveComponent } from './components/product-save/product-save.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailsComponent,
    ProductListComponent,
    ShoppingCartComponent,
    AddressPipe,
    ProductEditComponent,
    PageNotFoundComponent,
    ProductFormComponent,
    ProductSaveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [ProductService],
  bootstrap: [AppComponent],
})
export class AppModule {}
