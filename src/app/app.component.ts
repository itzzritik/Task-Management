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
import { getDefaultEventTime } from '../utils/date';

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
  defaultTime = getDefaultEventTime();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activeTask = this.fb.group({
      type: [TASK_TYPE.general, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      desc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      fromDate: [this.defaultTime[0], [Validators.required]],
      toDate: [this.defaultTime[1], [Validators.required]],
    });
  }

  onSubmit(): void {
    this.isModalOpen = true;
  }

  onNewTask(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
