import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { IndexClientComponent } from "./components/clients/index-client/index-client.component";
import { CreateClientComponent } from "./components/clients/create-client/create-client.component";

const appRoute : Routes = [
    {path: '', redirectTo: 'inicio', pathMatch: 'full'},
    {path: 'inicio', component: InicioComponent, canActivate: [AdminGuard] },

    {path: 'panel', children:[
        {path: 'clients', component: IndexClientComponent, canActivate: [AdminGuard]},
        {path: 'clients/register', component: CreateClientComponent, canActivate: [AdminGuard]}
    ]},

    {path: 'login', component: LoginComponent}

]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)