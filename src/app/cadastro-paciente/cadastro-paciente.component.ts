import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent {
  form: FormGroup;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PacienteService,
    private customValidatorService: CustomValidatorService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, this.customValidatorService.validarNomeCompleto()]),
    gender: new FormControl(''),
    dataNascimento: new FormControl('', Validators.required), 
    cpf: new FormControl('', Validators.required), 
    rg: new FormControl(''),
    civil: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    emergencyContact: new FormControl(''),
    contactPhone: new FormControl(''),
    alergies: new FormControl(''),
    care: new FormControl(''),
    convenio: new FormControl(''),
    convenioNum: new FormControl(''),
    convenioVal: new FormControl(''),
    cep: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    streetNum: new FormControl(''),
    streetExtra: new FormControl(''),
    hood: new FormControl(''),
    reference: new FormControl(''),
    id: new FormControl('')

    });

    // Verifique se há um ID de paciente na rota
    this.route.params.subscribe(params => {
      const pacienteId = params['id'];
      if (pacienteId) {
        const paciente = this.patientService.getPatientById(pacienteId);
        if (paciente) {
          this.isEdit = true;
          this.form.patchValue(paciente);
        }
      }
    });
  }

  cadastrar() {
    if (this.form.valid) {
      if (this.isEdit) {
        this.patientService.updatePatient(this.form.value);
        alert('Paciente atualizado com sucesso!');
      } else {
        this.patientService.addPatient(this.form.value);
        alert('Paciente cadastrado com sucesso!');
      }
      this.router.navigate(['/paciente']);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }
}
