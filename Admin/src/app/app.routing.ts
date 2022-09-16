import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { IndexClientComponent } from "./components/clients/index-client/index-client.component";

const appRoute : Routes = [
    {path: 'inicio', component: InicioComponent, canActivate: [AdminGuard] },

    {path: 'panel', children:[
        {path: 'clients', component: IndexClientComponent, canActivate: [AdminGuard]}
    ]},

    {path: 'login', component: LoginComponent}

]

export const appRoutingProviders : any[] = []
export const routing : ModuleWithProviders <any> = RouterModule.forRoot(appRoute)