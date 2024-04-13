import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { PacienteService } from '../services/paciente.service';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent, FontAwesomeModule, CommonModule, CardComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  pacienteData: any[] = [];
  filteredPacienteData: any[] = [];
  searchQuery: string = '';

  constructor(private pacienteService: PacienteService, private router: Router){
    this.pacienteData = this.pacienteService.getAllPatients();
    this.filteredPacienteData = [...this.pacienteData];
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

  filterPatients() {
    if (this.searchQuery.trim() === '') {
      this.filteredPacienteData = [...this.pacienteData];
      return;
    }
    this.filteredPacienteData = this.pacienteData.filter(patient =>
      patient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      patient.phone.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
