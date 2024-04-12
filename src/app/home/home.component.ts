import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../services/paciente.service';
import { CardComponent } from '../card/card.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent, FontAwesomeModule, CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  pacienteData: any[] = [];

  constructor(private pacienteService: PacienteService, private router: Router){
    this.pacienteData = this.pacienteService.getAllPatients();
  }

  isMenuRetracted = false;
  pageTitle: string = 'Página Inicial';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  editarPaciente(event: any) {
    const patientId = event;
    const paciente = this.pacienteData.find(p => p.id === patientId);
      this.router.navigate(['/paciente/edit', patientId]);
  }

}
