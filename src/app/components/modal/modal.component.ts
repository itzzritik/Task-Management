import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MODAL_MODE, TASK_ICON, TASK_TYPE } from '../../../utils/types';

import { IconComponent } from '../icon/icon.component';
import { startCase } from 'lodash';

@Component({
    selector: 'app-modal',
    imports: [ReactiveFormsModule, IconComponent, ButtonComponent, NgSelectModule],
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  // @ts-ignore
  @Input() activeTask: FormGroup;
  @Input() modalMode: keyof typeof MODAL_MODE = 'closed';
  @Output() onClose = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  closing: boolean = false;
  title = {
    [TASK_TYPE.general]: 'Task',
    [TASK_TYPE.meeting]: startCase(TASK_TYPE.meeting),
    [TASK_TYPE.event]: startCase(TASK_TYPE.event),
  } as const;

  TaskOptions = [
    { value: TASK_TYPE.general, label: startCase(TASK_TYPE.general) },
    { value: TASK_TYPE.meeting, label: startCase(TASK_TYPE.meeting) },
    { value: TASK_TYPE.event, label: startCase(TASK_TYPE.event) },
  ];

  getTaskIcon (type: keyof typeof TASK_TYPE) {
    return TASK_ICON[type]
  }
  getTitle() {
    return this.title[this.activeTask.get('type')?.value as keyof typeof TASK_TYPE ] ?? 'Task'
  }

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
  onSubmitEvent() {
    this.onSubmit.emit()
  }
  onDeleteEvent() {
    this.onDelete.emit()
  }
}
