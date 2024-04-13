import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidatorService } from '../services/custom-validator.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-cadastro-paciente',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, ToolbarComponent, SweetAlert2Module, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './cadastro-paciente.component.html',
  styleUrl: './cadastro-paciente.component.scss'
})

export class CadastroPacienteComponent {

  isMenuRetracted = false;
  pageTitle: string = 'Cadastro de Pacientes';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  form: FormGroup;
  isEdit: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PacienteService,
    private customValidatorService: CustomValidatorService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      gender: new FormControl('', Validators.required),
      dataNascimento: new FormControl('', Validators.required),
      cpf: new FormControl('', Validators.required),
      rg: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(20)
      ]),
      civil: new FormControl('', Validators.required),
      natural: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      emergencyContact: new FormControl('', Validators.required),
      contactPhone: new FormControl('', Validators.required),
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
        Swal.fire({
          text: "Cadastro atualizado com sucesso!",
          icon: "success",
          confirmButtonColor: "#0A7B73",
          confirmButtonText: "OK"
        });
      } else {
        this.patientService.addPatient(this.form.value);
        Swal.fire({
          text: "Paciente cadastrado com sucesso!",
          icon: "success",
          confirmButtonColor: "#0A7B73",
          confirmButtonText: "OK"
        });
      }
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        text: "Por favor, preencha todos os campos corretamente.",
        icon: "error",
        confirmButtonColor: "#0A7B73"
      });
    }
  }

  deletePatient() {
    if (this.isEdit) {
    const pacienteId = this.form.get('id')?.value; 
    if (pacienteId) {
      this.patientService.deletePatient(pacienteId);
      Swal.fire({
        text: "Paciente excluído com sucesso!",
        icon: "success",
        confirmButtonColor: "#0A7B73",
        confirmButtonText: "OK"
      });
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        text: "Não foi possível encontrar o paciente.",
        icon: "error",
        confirmButtonColor: "#0A7B73"
      });
    }
  }}


  

}
