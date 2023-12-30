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
import { nanoid } from 'nanoid';

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

  activeTaskId?: string;
  loading: boolean = true;
  floatHeader: boolean = false;
  showFilter: boolean = false;
  closingFilter: boolean = false;
  modalMode: keyof typeof MODAL_MODE = 'closed';
  defaultTime = getDefaultEventTime();

  taskList = new BehaviorSubject<TASK[]>([])
  filteredTaskList = combineLatest([this.taskList, this.filter, this.sortMode]).pipe(
    map(([items, filterData, sortMode]) => {
      let clone = cloneDeep(items)
      let filter = cloneDeep(filterData)

      if (filter?.type?.length) {
        clone = clone.filter((v) => filter?.type?.includes(v?.type))
      }

      if (filter?.title?.length) {
        clone = clone.filter((v) => v?.title?.includes(filter?.title ?? ''))
      }

      if (filter?.desc?.length) {
        clone = clone.filter((v) => v?.desc?.includes(filter?.desc ?? ''))
      }

      if (filter?.assigned?.length) {
        clone = clone.filter((v) => filter?.assigned?.includes(v?.assigned))
      }

      if (filter?.fromDate?.length) {
        clone = clone.filter((v) => !v?.fromDate || filter?.fromDate === v?.fromDate)
      }

      if (filter?.toDate?.length) {
        clone = clone.filter((v) => !v?.toDate || filter?.toDate === v?.toDate)
      }

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
      const users = [...new Set(items.map((task) => task.assigned))].map((user) => ({
        value: user, label: startCase(user)
      }))
      users.sort((a, b) => a.label.localeCompare(b.label));
      return users;
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

    this.renderer.listen('body', 'scroll', () => {
      if (document.body.scrollTop >= 24) this.floatHeader = true;
      else this.floatHeader = false;
    });

    if (typeof localStorage !== 'undefined') {
      try {
        const localFilter = localStorage.getItem('filter');
        if (localFilter) this.filter.next(JSON.parse(localFilter));

        const localSortMode = localStorage.getItem('sortMode');
        if (localSortMode) this.sortMode.next(parseInt(localSortMode));

        const localTaskList = JSON.parse(localStorage.getItem('taskList') ?? '[]');
        if (localTaskList?.length) this.taskList.next(localTaskList);
        else this.taskList.next(mockTaskList);
      }
      catch (e) { }
      finally {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }



      this.sortMode.subscribe(sortMode => {
        localStorage.setItem('sortMode', JSON.stringify(sortMode));
      });

      this.filter.subscribe(filter => {
        localStorage.setItem('filter', JSON.stringify(filter));
      });

      this.taskList.subscribe(taskList => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
      });
    }
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
  clearFilters(): void {
    this.initActiveFilter();
    this.applyFilter();
  }
  showClear(): boolean {
    return Object.values(this.activeFilter.value).some((v) => (v != undefined))
  }
  openFilter(): void {
    this.activeFilter.patchValue(this.filter.value);
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
  onEditTask(activeTask: TASK, id: string): void {
    this.modalMode = 'edit'
    this.activeTaskId = id;
    this.activeTask.patchValue(activeTask);
  }
  onSubmit(): void {
    if (this.modalMode === 'new') {
      const newId = nanoid();
      this.activeTaskId = newId;
      this.taskList.next([
        {
          id: newId,
          ...this.activeTask.value,
          createDate: new Date().toISOString(),
          updateDate: new Date().toISOString(),
        },
        ...this.taskList.getValue(),
      ]);
    } else if (this.modalMode === 'edit' && this.activeTaskId != undefined) {
      let list = this.taskList.getValue()
      list = list.map((l) => {
        if (l.id === this.activeTaskId) return {
          ...l,
          ...this.activeTask.value,
          updateDate: new Date().toISOString(),
        }
        return l;
      })
      this.taskList.next(list)
    }
    this.closeModal(true);
  }
  onDelete(): void {
    if (this.modalMode === 'edit' && this.activeTaskId != undefined) {
      let list = this.taskList.getValue()
      list = list.filter(({id}) => id != this.activeTaskId)
      this.taskList.next(list)
    }
    this.closeModal();
  }
  closeModal(delay?: boolean): void {
    this.modalMode = 'closed'
    this.initActiveTask();
    setTimeout(() => (this.activeTaskId = undefined), delay ? 1000 : 0)
  }
}
