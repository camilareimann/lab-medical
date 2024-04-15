import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteList: any[] = [];

  constructor() {
    const localData = localStorage.getItem('pacienteData');
    if (localData) {
      this.pacienteList = JSON.parse(localData);
    }
  }

  getAllPatients(): any[] {
    return this.pacienteList;
  }

  getPatientById(patientId: string): any {
    return this.pacienteList.find(p => p.id === patientId);
  }

  addPatient(patient: any): void {
    const patientId = Math.floor(1000 + Math.random() * 9000);
    patient.id = patientId.toString();
    this.pacienteList.push(patient);
    this.saveToLocalStorage();
  }

  updatePatient(updatedPatient: any): void {
    const index = this.pacienteList.findIndex(p => p.id === updatedPatient.id);
  if (index !== -1) {
    // Keep the existing exams
    const existingExams = this.pacienteList[index].exams;
    // Update the patient data
    this.pacienteList[index] = { ...updatedPatient, exams: existingExams };
    this.saveToLocalStorage();
    }
  }

  deletePatient(patientId: string): void {
    const index = this.pacienteList.findIndex(p => p.id === patientId);
    if (index !== -1) {
      this.pacienteList.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('pacienteData', JSON.stringify(this.pacienteList));
  }

  addExam(patientId: string, exam: any): void {
    const patient = this.getPatientById(patientId);
    if (patient) {
      if (!patient.exams) {
        patient.exams = [];
      }
      const examId = Math.floor(1000 + Math.random() * 9000);
      exam.id = examId.toString();
      patient.exams.push(exam);
      this.saveToLocalStorage();
    }
  }

  updateExam(patientId: string, updatedExam: any): void {
    const patient = this.getPatientById(patientId);
    if (patient && patient.exams) {
      const index = patient.exams.findIndex((e: any) => e.id === updatedExam.id);
      if (index !== -1) {
        patient.exams[index] = { ...updatedExam };
        this.saveToLocalStorage();
      }
    }
  }
  
  deleteExam(patientId: string, examId: string): void {
    const patient = this.getPatientById(patientId);
    if (patient && patient.exams) {
      const index = patient.exams.findIndex((e: any) => e.id === examId);
      if (index !== -1) {
        patient.exams.splice(index, 1);
        this.saveToLocalStorage();
      }
    }
  }

}
