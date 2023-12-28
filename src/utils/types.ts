export enum TASK_TYPE {
  general = 'general',
  meeting = 'meeting',
  event = 'event',
}

export enum MODAL_MODE {
  new = 'new',
  edit = 'edit',
  closed = 'closed'
}

export type TASK = {
  type: keyof typeof TASK_TYPE,
  title: string,
  desc: string,
  fromDate?: string,
  toDate?: string,
}
