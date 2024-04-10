import { Routes } from '@angular/router';
import { SinginSignupPageComponent } from './sing-in-sign-up/singin-signup-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {
        path: "login",
        component: SinginSignupPageComponent
    },

    {
        path: "cadastro",
        component: SignUpComponent
    },

];
