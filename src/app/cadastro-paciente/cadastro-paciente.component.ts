import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, ToolbarComponent],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})
export class CadastroPacienteComponent {

  isMenuRetracted = false;
  pageTitle: string = 'Cadastro do Paciente';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  constructor(
    private customValidatorService: CustomValidatorService,
  ) { }

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

  cadastrar() {
    const listaPacientes = localStorage.getItem('pacienteData');
    const pacientes = listaPacientes ? JSON.parse(listaPacientes) : [];

    const existingPaciente = pacientes.find((paciente: any) => paciente.cpf === this.form.value.cpf); 

    if (existingPaciente) {
      alert('Paciente já cadastrado');

    } else {

      if (this.form.valid) {

        const patientId = Math.floor(1000 + Math.random() * 9000);
        this.form.patchValue({ id: patientId.toString() });

        pacientes.push(this.form.value);
        localStorage.setItem('pacienteData', JSON.stringify(pacientes));


        this.form.controls['name'].setValue('');
        this.form.controls['gender'].setValue('');
        this.form.controls['dataNascimento'].setValue('');
        this.form.controls['cpf'].setValue('');
        this.form.controls['rg'].setValue('');
        this.form.controls['civil'].setValue('');
        this.form.controls['phone'].setValue('');
        this.form.controls['email'].setValue('');
        this.form.controls['emergencyContact'].setValue('');
        this.form.controls['contactPhone'].setValue('');
        this.form.controls['alergies'].setValue('');
        this.form.controls['care'].setValue('');
        this.form.controls['convenio'].setValue('');
        this.form.controls['convenioNum'].setValue('');
        this.form.controls['convenioVal'].setValue('');
        this.form.controls['state'].setValue('');
        this.form.controls['city'].setValue('');
        this.form.controls['street'].setValue('');
        this.form.controls['streetNum'].setValue('');
        this.form.controls['streetExtra'].setValue('');
        this.form.controls['hood'].setValue('');
        this.form.controls['reference'].setValue('');

        alert('Cadastro concluído')

      } else {
        alert('Formulário inválido');
      }
    }
  }
}