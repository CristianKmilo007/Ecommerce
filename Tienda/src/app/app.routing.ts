import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

import { ClientGuard } from "./guards/client.guard";
import { IndexProductsComponent } from "./components/products/index-products/index-products.component";


const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'account/profile', component: ProfileComponent, canActivate: [ClientGuard]},

    {path: 'products', component: IndexProductsComponent},
    {path: 'products/laboratory/:laboratory', component: IndexProductsComponent},
]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)