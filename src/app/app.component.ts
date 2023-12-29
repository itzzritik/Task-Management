import { Component, HostListener, Renderer2, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FILTER, MODAL_MODE, SORT_MODE, TASK, TASK_ICON, TASK_TYPE } from '../utils/types';
import { getDefaultEventTime, readableDate } from '../utils/date';
import { mockTaskList } from '../utils/mockData';
import { IconComponent } from './components/icon/icon.component';
import cloneDeep from 'lodash/cloneDeep';
import startCase from 'lodash/startCase';
import { NgSelectModule } from '@ng-select/ng-select';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule, RouterOutlet, IconComponent, ButtonComponent, NgSelectModule, ModalComponent, ReactiveFormsModule, FormsModule ],
})
export class AppComponent {
  // @ts-ignore
  activeTask: FormGroup;
  // @ts-ignore
  activeFilter: FormGroup;
  filter = new BehaviorSubject<FILTER>({});
  sortMode = new BehaviorSubject<number>(0);

  activeTaskIndex?: number;
  floatHeader: boolean = false;
  showFilter: boolean = false;
  closingFilter: boolean = false;
  modalMode: keyof typeof MODAL_MODE = 'closed';
  defaultTime = getDefaultEventTime();

  taskList = new BehaviorSubject<TASK[]>(mockTaskList)
  filteredTaskList = combineLatest([this.taskList, this.filter, this.sortMode]).pipe(
    map(([items, filter, sortMode]) => {
      const clone = cloneDeep(items)
      if (sortMode !== 0) {
        clone.sort((a, b) => {
          if (sortMode === 1) return a.createDate.localeCompare(b.createDate);
          if (sortMode === 2) return b.createDate.localeCompare(a.createDate);
          if (sortMode === 3) return a.updateDate.localeCompare(b.updateDate);
          return b.updateDate.localeCompare(a.updateDate);
        });
      }

      return clone;
    })
  );
  AssignedUsers = combineLatest([this.taskList]).pipe(
    map(([items]) => {
      return [...new Set(items.map((task) => task.assigned))].map((user) => ({
        value: user, label: startCase(user)
      }));
    })
  );

  SortOptions = [
    { value: 0, label: 'No Sort' },
    { value: 1, label: 'Create Date Ascending' },
    { value: 2, label: 'Create Date Descending' },
    { value: 3, label: 'Update Date Ascending' },
    { value: 4, label: 'Update Date Descending' },
  ];
  TaskOptions = [
    { value: TASK_TYPE.general, label: startCase(TASK_TYPE.general) },
    { value: TASK_TYPE.meeting, label: startCase(TASK_TYPE.meeting) },
    { value: TASK_TYPE.event, label: startCase(TASK_TYPE.event) },
  ];

  constructor(private fb: FormBuilder, private renderer: Renderer2) { }

  initActiveTask () {
    this.activeTask = this.fb.group({
      type: [TASK_TYPE.general, [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      desc: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      assigned: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      fromDate: [this.defaultTime[0], [Validators.required]],
      toDate: [this.defaultTime[1], [Validators.required]],
    });
  }
  initActiveFilter () {
    this.activeFilter = this.fb.group({
      type: [undefined],
      title: [undefined],
      desc: [undefined],
      assigned: [undefined],
      fromDate: [undefined],
      toDate: [undefined],
    });
  }

  ngOnInit(): void {
    this.initActiveTask();
    this.initActiveFilter();
    this.updateAssignedUsers()
    this.renderer.listen('body', 'scroll', () => {
      if (document.body.scrollTop >= 36) this.floatHeader = true;
      else this.floatHeader = false;
    });
  }

  updateAssignedUsers() {

  }

  getTaskIcon (type: keyof typeof TASK_TYPE) {
    return TASK_ICON[type]
  }
  getReadableDate (date?: string) {
    return readableDate(date)
  }

  updateSortMode(mode: number): void {
    this.sortMode.next(mode);
  }
  openFilter(): void {
    this.showFilter = true
  }
  closeFilter(): void {
    this.closingFilter = true;
    setTimeout(() => {
      this.showFilter = false;
      this.closingFilter = false;
      this.initActiveFilter();
    }, 250);
  }
  applyFilter(): void {
    this.filter.next(cloneDeep(this.activeFilter.value))
    this.closeFilter()
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
    if (this.modalMode === 'new') {
      this.taskList.next([
        {
          ...this.activeTask.value,
          createDate: new Date().toISOString(),
          updateDate: new Date().toISOString(),
        },
        ...this.taskList.getValue(),
      ]);
    } else if (this.modalMode === 'edit' && this.activeTaskIndex != undefined) {
      const list = this.taskList.getValue()
      list[this.activeTaskIndex] = {
        ...this.activeTask.value,
        updateDate: new Date().toISOString(),
      };
      this.taskList.next(list)
    }
    this.closeModal();
  }
  closeModal(): void {
    this.modalMode = 'closed'
    this.activeTaskIndex = undefined
    this.initActiveTask();
  }
}
