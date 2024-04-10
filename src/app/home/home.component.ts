import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ToolbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isMenuRetracted = false;
  pageTitle: string = 'Página Inicial';

  onSidebarRetracted(isRetracted: boolean) {
    this.isMenuRetracted = isRetracted;
  }

}
