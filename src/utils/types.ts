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
  assigned: string,
  fromDate?: string,
  toDate?: string,
}

export const TASK_ICON = {
  [TASK_TYPE.general]: 'e1ff',
  [TASK_TYPE.meeting]: 'f0c0',
  [TASK_TYPE.event]: 'f073'
}
