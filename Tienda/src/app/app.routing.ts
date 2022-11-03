import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { ProfileComponent } from "./components/user/profile/profile.component";

import { ClientGuard } from "./guards/client.guard";


const appRoute : Routes = [
    {path: '', component: InicioComponent},
    {path: 'login', component: LoginComponent},
    {path: 'account/profile', component: ProfileComponent, canActivate: [ClientGuard]},
]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)