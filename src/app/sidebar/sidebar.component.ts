import { Component, EventEmitter, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() sidebarRetracted = new EventEmitter<boolean>();

  isMenuRetracted = false;
  
  toggleMenuRetraction() {
    this.isMenuRetracted = !this.isMenuRetracted;
    this.sidebarRetracted.emit(this.isMenuRetracted);
}

}
