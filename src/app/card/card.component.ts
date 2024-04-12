import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() patient: any;

  @Output() editPatient: EventEmitter<string> = new EventEmitter<string>();

  editarCadastro(patientId: string) {
    this.editPatient.emit(patientId);
  }
  
}
