import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { PacienteService } from '../services/paciente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-exames',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, SidebarComponent, FormsModule, ToolbarComponent, SweetAlert2Module, NgxMaskDirective, NgxMaskPipe],
  templateUrl: './exames.component.html',
  styleUrl: './exames.component.scss'
})
export class ExamesComponent implements OnInit{

  isMenuRetracted = false;
  pageTitle: string = 'Cadastro de Exames';
  form: FormGroup;
  isEdit: boolean = false;
  pacienteData: any[] = [];
  filteredPacienteData: any[] = [];
  searchQuery: string = '';
  selectedPatientId: string | null = null;
  selectedExamId: string | null = null;

  isFormVisible: boolean = false; 

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

  ngOnInit(): void {

  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService,
  ) {

    this.pacienteData = this.pacienteService.getAllPatients();
    this.filteredPacienteData = [...this.pacienteData];

    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(64)
      ]),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      type: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      url: new FormControl('', Validators.required),
      lab: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(32)
      ]),
      results: new FormControl('', [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(1024)
      ]),
      id: new FormControl('')
    });

  }

  filterPatients(): void {
    if (this.searchQuery.trim() !== '') {
      this.filteredPacienteData = this.pacienteData.filter(patient =>
        patient.name.includes(this.searchQuery) ||
        patient.email.includes(this.searchQuery) ||
        patient.phone.includes(this.searchQuery)
      );
    } else {
      this.filteredPacienteData = [...this.pacienteData];
    }
  }
  
  get patientExams(): any[] {
    const patient = this.pacienteService.getPatientById(this.selectedPatientId!);
    return patient ? patient.exams : [];
  }

  cadastrar(): void {
    if (this.form.valid) {
      const exam = this.form.value;
      if (this.isEdit) {
        this.pacienteService.updateExam(this.selectedPatientId!, exam);
      } else {
        this.pacienteService.addExam(this.selectedPatientId!, exam);
      }
      this.resetForm();
    }
  }

  editar(examId: string): void {
    const patient = this.pacienteService.getPatientById(this.selectedPatientId!);
    const exam = patient.exams.find((e: any) => e.id === examId);
    if (exam) {
      this.form.patchValue(exam);
      this.isEdit = true;
      this.selectedExamId = examId;
    }
  }
  
  deletar(examId: string): void {
    this.pacienteService.deleteExam(this.selectedPatientId!, examId);
    this.resetForm();
  }

  resetForm(): void {
    this.form.reset();
    this.isEdit = false;
    this.selectedExamId = null;
  }

  selectPatient(patientId: string): void {
    this.selectedPatientId = patientId;
    this.isFormVisible = true;
  }

}