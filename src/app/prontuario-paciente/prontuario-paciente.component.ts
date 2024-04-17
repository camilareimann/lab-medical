import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PacienteService } from '../services/paciente.service';
import { GenderPicturePipe } from '../pipes/gender-picture.pipe';


@Component({
  selector: 'app-prontuario-paciente',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent, FontAwesomeModule, CommonModule, GenderPicturePipe],
  templateUrl: './prontuario-paciente.component.html',
  styleUrl: './prontuario-paciente.component.scss'
})
export class ProntuarioPacienteComponent implements OnInit {
  isMenuRetracted = false;
  pageTitle: string = 'Prontuário do Paciente';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  patient: any; 

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const pacienteId = params['id'];
      if (pacienteId) {
        this.patient = this.patientService.getPatientById(pacienteId); 
      }
    });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PacienteService,
  ){

  }

  editarExame(examId: string): void {
    this.router.navigate(['/exame', examId]);
  }

  editarConsulta(consultaId: string): void {
    this.router.navigate(['/consulta', consultaId]);
  }

}
