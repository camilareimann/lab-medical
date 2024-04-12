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

  addPatient(patient: any): void {
    const patientId = Math.floor(1000 + Math.random() * 9000);
    patient.id = patientId.toString(); 
    this.pacienteList.push(patient);
    this.saveToLocalStorage(); 
  }

  updatePatient(updatedPatient: any): void {
    const index = this.pacienteList.findIndex((p) => p.id === updatedPatient.id);
    if (index !== -1) {
      this.pacienteList[index] = { ...updatedPatient };
      this.saveToLocalStorage(); 
    }
  }

  deletePatient(patientId: string): void {

    const index = this.pacienteList.findIndex((p) => p.id === patientId);
    if (index !== -1) {
      this.pacienteList.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('pacienteData', JSON.stringify(this.pacienteList));
  }

}
