import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TASK_TYPE } from '../../../utils/constants';
import startCase from 'lodash/startCase';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, NgSelectModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  closing: boolean = false;

  TaskOptions = [
    { value: TASK_TYPE.general, label: startCase(TASK_TYPE.general) },
    { value: TASK_TYPE.meeting, label: startCase(TASK_TYPE.meeting) },
    { value: TASK_TYPE.event, label: startCase(TASK_TYPE.event) },
  ];

  // @ts-ignore
  @Input() activeTask: FormGroup;
  @Input() label?: string = '';
  @Output() onClose = new EventEmitter();

  isValidField(field: string) {
    return (
      this.activeTask.get(field)?.invalid &&
      (this.activeTask.get(field)?.dirty || this.activeTask.get(field)?.touched)
    );
  }
  onCloseEvent() {
    this.closing = true;
    setTimeout(() => this.onClose.emit(), 250);
  }
  onSubmit() {
    console.log('Valid?', this.activeTask?.valid);
    console.log('Name', this.activeTask?.value.name);
    console.log('Email', this.activeTask?.value.email);
    console.log('Message', this.activeTask?.value.message);
  }
}
