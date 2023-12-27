import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TASK_TYPE } from '../utils/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ CommonModule, RouterOutlet, ButtonComponent, ModalComponent, ReactiveFormsModule ],
})
export class AppComponent {
  // @ts-ignore
  activeTask: FormGroup;
  title = 'Task Management';
  isModalOpen: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activeTask = this.fb.group({
      type: [TASK_TYPE.general, Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(15)]],
    });
  }

  onNewTask(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
