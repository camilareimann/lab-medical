import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PacienteService } from '../services/paciente.service';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent{

  isMenuRetracted = false;
  pageTitle: string = 'Cadastro do Paciente';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  constructor(
    private customValidatorService: CustomValidatorService,
    private patientService: PacienteService,
  ) { }

  pacienteObj: any = {};
  pacienteList: any[] = [];

  form = new FormGroup({
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


  updatePaciente() {
    this.patientService.updatePatient(this.form.value);
  }

  onEdit(item: any) {
    this.form.setValue(item);
  }


  onDelete(item: any) {
    this.patientService.deletePatient(item.id);
  }

  cadastrar() {
    const existingPaciente = this.patientService.getAllPatients().find((p) => p.cpf === this.form.value.cpf);
  
    if (existingPaciente) {
      alert('Paciente já cadastrado');
    } else {
      if (this.form.valid) {
        if (!this.form.value.id) {
          const patientId = Math.floor(1000 + Math.random() * 9000);
          this.form.patchValue({ id: patientId.toString() });
        }
        this.patientService.addPatient(this.form.value);
        alert('Cadastro concluído');
      } else {
        alert('Formulário inválido');
      }
    }
  }
}