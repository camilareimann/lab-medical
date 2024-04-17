import { Routes } from '@angular/router';
import { SinginSignupPageComponent } from './singin-signup-page/singin-signup-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CadastroPacienteComponent } from './cadastro-paciente/cadastro-paciente.component';
import { ExamesComponent } from './exames/exames.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { ProntuariosComponent } from './prontuarios/prontuarios.component';
import { ProntuarioPacienteComponent } from './prontuario-paciente/prontuario-paciente.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: SinginSignupPageComponent },
    { path: 'cadastro', component: SignUpComponent },
    { path: 'paciente', component: CadastroPacienteComponent },
    { path: 'paciente/edit/:id', component: CadastroPacienteComponent },
    { path: 'exame', component: ExamesComponent },
    { path: 'exame/edit/:examId', component: ExamesComponent },
    { path: 'consulta', component: ConsultaComponent },
    { path: 'consulta/edit/:examId', component: ConsultaComponent },
    { path: 'prontuarios', component: ProntuariosComponent },
    { path: 'prontuarios/:id', component: ProntuarioPacienteComponent }
];
