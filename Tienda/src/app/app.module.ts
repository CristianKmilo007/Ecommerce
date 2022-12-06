import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { Placement as PopperPlacement, Options } from '@popperjs/core';



import { routing } from "./app.routing";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SiderbarComponent } from './components/user/siderbar/siderbar.component';
import { IndexProductsComponent } from './components/products/index-products/index-products.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { ShowProductComponent } from './components/products/show-product/show-product.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressComponent } from './components/user/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ProfileComponent,
    SiderbarComponent,
    IndexProductsComponent,
    SpinnerComponent,
    ShowProductComponent,
    CartComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
