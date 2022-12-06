import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

import { ClientGuard } from "./guards/client.guard";
import { IndexProductsComponent } from "./components/products/index-products/index-products.component";
import { ShowProductComponent } from "./components/products/show-product/show-product.component";
import { CartComponent } from "./components/cart/cart.component";
import { AddressComponent } from "./components/user/address/address.component";


const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'account/profile', component: ProfileComponent, canActivate: [ClientGuard]},
    {path: 'account/address', component: AddressComponent, canActivate: [ClientGuard]},
    {path: 'cart', component: CartComponent, canActivate: [ClientGuard]},

    {path: 'products', component: IndexProductsComponent},
    {path: 'products/laboratory/:laboratory', component: IndexProductsComponent},
    {path: 'products/:slug', component: ShowProductComponent},
]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)