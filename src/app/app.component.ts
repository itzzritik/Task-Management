import { Component, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MODAL_MODE, TASK, TASK_ICON, TASK_TYPE } from '../utils/types';
import { getDefaultEventTime, readableDate } from '../utils/date';
import { mockTaskList } from '../utils/mockData';
import { IconComponent } from './components/icon/icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [ CommonModule, RouterOutlet, IconComponent, ButtonComponent, ModalComponent, ReactiveFormsModule ],
})
export class AppComponent {
  // @ts-ignore
  activeTask: FormGroup;
  activeTaskIndex?: number;
  floatHeader: boolean = false;
  modalMode: keyof typeof MODAL_MODE = 'closed';
  defaultTime = getDefaultEventTime();

  taskList: TASK[] = []

  constructor(private fb: FormBuilder, private renderer: Renderer2) { }

  initForm () {
    this.activeTask = this.fb.group({
      type: [TASK_TYPE.general, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      desc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      assigned: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      fromDate: [this.defaultTime[0], [Validators.required]],
      toDate: [this.defaultTime[1], [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.taskList = mockTaskList
    this.initForm();
    this.renderer.listen('body', 'scroll', () => {
      if (document.body.scrollTop >= 40) this.floatHeader = true;
      else this.floatHeader = false;
    });
  }

  getTaskIcon (type: keyof typeof TASK_TYPE) {
    return TASK_ICON[type]
  }
  getReadableDate (date?: string) {
    return readableDate(date)
  }

  onNewTask(): void {
    this.modalMode = 'new'
  }

  onEditTask(activeTask: TASK, i: number): void {
    this.modalMode = 'edit'
    this.activeTaskIndex = i;
    this.activeTask.patchValue(activeTask);
  }

  onSubmit(): void {
    if (this.modalMode === 'new')
      this.taskList = [this.activeTask.value, ...this.taskList]
    else if (this.modalMode === 'edit' && this.activeTaskIndex != undefined)
      this.taskList[this.activeTaskIndex] = this.activeTask.value
    this.closeModal();
  }

  closeModal(): void {
    this.modalMode = 'closed'
    this.activeTaskIndex = undefined
    this.initForm();
  }
}
