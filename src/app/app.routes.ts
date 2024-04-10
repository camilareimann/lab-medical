import { Routes } from '@angular/router';
import { SinginSignupPageComponent } from './singin-signup-page/singin-signup-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: "",
        component: AppComponent
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
