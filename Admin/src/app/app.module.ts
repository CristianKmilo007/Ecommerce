import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { Placement as PopperPlacement, Options } from '@popperjs/core';
import { NgxSpinnerModule } from "ngx-spinner";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClientComponent } from './components/clients/index-client/index-client.component';
import { CreateClientComponent } from './components/clients/create-client/create-client.component';
import { EditClientComponent } from './components/clients/edit-client/edit-client.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CreateProductsComponent } from './components/products/create-products/create-products.component';
import { IndexProductsComponent } from './components/products/index-products/index-products.component';
import { EditProductsComponent } from './components/products/edit-products/edit-products.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClientComponent,
    CreateClientComponent,
    EditClientComponent,
    SpinnerComponent,
    CreateProductsComponent,
    IndexProductsComponent,
    EditProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatTooltipModule,
    NgbPaginationModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
