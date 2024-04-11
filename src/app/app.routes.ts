import { Routes } from '@angular/router';
import { SinginSignupPageComponent } from './singin-signup-page/singin-signup-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    
    {
        path: "", 
        redirectTo: "home", 
        pathMatch: "full" 
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: SinginSignupPageComponent
    },
    {
        path: "cadastro",
        component: SignUpComponent
    },

];
