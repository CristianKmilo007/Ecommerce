import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";

import { IndexClientComponent } from "./components/clients/index-client/index-client.component";
import { CreateClientComponent } from "./components/clients/create-client/create-client.component";
import { EditClientComponent } from "./components/clients/edit-client/edit-client.component";
import { CreateProductsComponent } from "./components/products/create-products/create-products.component";
import { IndexProductsComponent } from "./components/products/index-products/index-products.component";
import { EditProductsComponent } from "./components/products/edit-products/edit-products.component";
import { InventoryProductsComponent } from "./components/products/inventory-products/inventory-products.component";
import { CreateCouponComponent } from "./components/coupons/create-coupon/create-coupon.component";
import { IndexCouponComponent } from "./components/coupons/index-coupon/index-coupon.component";
import { EditCouponComponent } from "./components/coupons/edit-coupon/edit-coupon.component";
import { ConfigComponent } from "./components/config/config.component";
import { VarietyProductsComponent } from "./components/products/variety-products/variety-products.component";

const appRoute : Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent, canActivate: [AdminGuard] },

    {path: 'panel', children:[
        {path: 'clients', component: IndexClientComponent, canActivate: [AdminGuard]},
        {path: 'clients/register', component: CreateClientComponent, canActivate: [AdminGuard]},
        {path: 'clients/:id', component: EditClientComponent, canActivate: [AdminGuard]},
        
        {path: 'products/register', component: CreateProductsComponent, canActivate: [AdminGuard]},
        {path: 'products', component: IndexProductsComponent, canActivate: [AdminGuard]},
        {path: 'products/:id', component: EditProductsComponent, canActivate: [AdminGuard]},
        {path: 'products/inventory/:id', component: InventoryProductsComponent, canActivate: [AdminGuard]},
        {path: 'products/variety/:id', component: VarietyProductsComponent, canActivate: [AdminGuard]},

        {path: 'coupons/register', component: CreateCouponComponent, canActivate: [AdminGuard]},
        {path: 'coupons', component: IndexCouponComponent, canActivate: [AdminGuard]},
        {path: 'coupons/:id', component: EditCouponComponent, canActivate: [AdminGuard]},

        {path: 'config', component: ConfigComponent, canActivate: [AdminGuard]},
    ]},

    {path: 'login', component: LoginComponent}

]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)