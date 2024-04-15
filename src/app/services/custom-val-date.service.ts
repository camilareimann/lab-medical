import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class CustomValDateService {

  constructor() { }

  currentDateOrFutureValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();
  
      selectedDate.setHours(0, 0, 0, 0);
      currentDate.setHours(0, 0, 0, 0);
  
      if (selectedDate < currentDate) {
        return { 'pastDate': true };
      }
      return null; 
    };
  }


  currentTimeOrFutureValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currentTime = new Date();
      const selectedTime = new Date(control.value);
      const selectedDate = new Date(control.root.get('date')?.value);
      if (selectedDate.getTime() === currentTime.getTime()) {
        if (selectedTime.getHours() < currentTime.getHours() || 
            (selectedTime.getHours() === currentTime.getHours() && selectedTime.getMinutes() < currentTime.getMinutes())) {
          return { 'invalidTime': true };
        }
      }
      return null;
    };
  }
  
}