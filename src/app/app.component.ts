import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button/button.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ButtonComponent]
})
export class AppComponent {
  title = 'TaskManagement';

  onNewTask(): void {
    console.log('Button clicked!');
  }
}
