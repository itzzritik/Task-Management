import { nanoid } from 'nanoid';
import { getRandomDateFromPastMonth } from './date';
import { TASK } from './types';

export const mockTaskList = [
  {
    type: 'general',
    title: 'Quarterly Review Meeting',
    desc: 'Prepare agenda for the quarterly review meeting.',
    assigned: 'Management Team'
  },
  {
    type: 'meeting',
    title: 'Product Development Discussion',
    desc: 'Discuss the progress of new product development.',
    assigned: 'Product Team',
    fromDate: '2023-12-29T09:30',
    toDate: '2023-12-29T11:00'
  },
  {
    type: 'event',
    title: 'Industry Conference',
    desc: 'Attend the annual industry conference.',
    assigned: 'Sales and Marketing',
    fromDate: '2023-12-31T08:00',
    toDate: '2023-12-31T17:00'
  },
  {
    type: 'general',
    title: 'Budget Planning Session',
    desc: 'Prepare budget plans for the upcoming fiscal year.',
    assigned: 'Finance Department'
  },
  {
    type: 'meeting',
    title: 'Client Presentation',
    desc: 'Prepare presentation for a client meeting.',
    assigned: 'Sales Team',
    fromDate: '2024-01-02T14:00',
    toDate: '2024-01-02T15:30'
  },
  {
    type: 'event',
    title: 'Team Building Activity',
    desc: 'Organize team building activity for employees.',
    assigned: 'Human Resources',
    fromDate: '2024-01-05T11:00',
    toDate: '2024-01-05T16:00'
  },
  {
    type: 'general',
    title: 'Website Redesign Planning',
    desc: 'Initiate planning for website redesign.',
    assigned: 'Marketing Department'
  },
  {
    type: 'meeting',
    title: 'Project Kickoff Meeting',
    desc: 'Initiate the new project with a kickoff meeting.',
    assigned: 'Project Managers',
    fromDate: '2024-01-08T09:30',
    toDate: '2024-01-08T11:00'
  },
  {
    type: 'event',
    title: 'Company Anniversary Celebration',
    desc: 'Plan and execute the company\'s anniversary celebration.',
    assigned: 'Events Committee',
    fromDate: '2024-01-10T15:00',
    toDate: '2024-01-10T19:00'
  },
  {
    type: 'general',
    title: 'Training Material Review',
    desc: 'Review training materials for new hires.',
    assigned: 'Training Department'
  },
  {
    type: 'meeting',
    title: 'Marketing Strategy Meeting',
    desc: 'Discuss and finalize the marketing strategy.',
    assigned: 'Marketing Team',
    fromDate: '2024-01-12T10:00',
    toDate: '2024-01-12T12:00'
  },
  {
    type: 'event',
    title: 'Product Launch Event',
    desc: 'Host the official launch event for a new product.',
    assigned: 'Product Launch Committee',
    fromDate: '2024-01-15T14:00',
    toDate: '2024-01-15T18:00'
  },
  {
    type: 'general',
    title: 'Inventory Assessment',
    desc: 'Conduct an assessment of inventory levels.',
    assigned: 'Supply Chain Department'
  },
  {
    type: 'meeting',
    title: 'Sales Review Meeting',
    desc: 'Review and analyze sales performance.',
    assigned: 'Sales Department',
    fromDate: '2024-01-18T11:30',
    toDate: '2024-01-18T13:00'
  },
  {
    type: 'event',
    title: 'Team Appreciation Luncheon',
    desc: 'Organize a luncheon to appreciate team efforts.',
    assigned: 'Human Resources',
    fromDate: '2024-01-22T12:00',
    toDate: '2024-01-22T14:00'
  },
  {
    type: 'general',
    title: 'IT Infrastructure Upgrade',
    desc: 'Plan the upgrade of IT infrastructure.',
    assigned: 'IT Department'
  },
  {
    type: 'meeting',
    title: 'Client Proposal Discussion',
    desc: 'Discuss proposal details with a potential client.',
    assigned: 'Sales Team',
    fromDate: '2024-01-25T09:00',
    toDate: '2024-01-25T10:30'
  },
  {
    type: 'general',
    title: 'Employee Training Session',
    desc: 'Plan and organize training for new procedures.',
    assigned: 'Training Department'
  },
  {
    type: 'meeting',
    title: 'Team Collaboration Session',
    desc: 'Collaborate on cross-functional projects.',
    assigned: 'Various Teams',
    fromDate: '2024-01-28T10:30',
    toDate: '2024-01-28T12:00'
  },
  {
    type: 'event',
    title: 'Charity Fundraiser Event',
    desc: 'Organize an event for charity fundraising.',
    assigned: 'Community Engagement Team',
    fromDate: '2024-01-30T14:00',
    toDate: '2024-01-30T18:00'
  },
  {
    type: 'general',
    title: 'Financial Report Analysis',
    desc: 'Analyze financial reports for the past quarter.',
    assigned: 'Finance Department'
  },
  {
    type: 'meeting',
    title: 'Project Progress Review',
    desc: 'Review the progress of ongoing projects.',
    assigned: 'Project Managers',
    fromDate: '2024-02-02T09:00',
    toDate: '2024-02-02T10:30'
  },
  {
    type: 'event',
    title: 'Annual Employee Appreciation Dinner',
    desc: 'Host a dinner event to appreciate employees.',
    assigned: 'Human Resources',
    fromDate: '2024-02-05T18:30',
    toDate: '2024-02-05T21:00'
  },
  {
    type: 'general',
    title: 'Vendor Negotiation Meeting',
    desc: 'Negotiate terms with potential vendors.',
    assigned: 'Procurement Department'
  },
  {
    type: 'meeting',
    title: 'Marketing Campaign Strategy Session',
    desc: 'Strategize for upcoming marketing campaigns.',
    assigned: 'Marketing Team',
    fromDate: '2024-02-08T11:00',
    toDate: '2024-02-08T13:00'
  },
  {
    type: 'event',
    title: 'Company Awards Ceremony',
    desc: 'Organize an awards ceremony for outstanding employees.',
    assigned: 'Employee Recognition Committee',
    fromDate: '2024-02-12T16:00',
    toDate: '2024-02-12T19:00'
  },
  {
    type: 'general',
    title: 'Operations Process Improvement',
    desc: 'Analyze and improve operational processes.',
    assigned: 'Operations Team'
  },
  {
    type: 'meeting',
    title: 'Sales Forecast Discussion',
    desc: 'Discuss sales forecasts for the upcoming quarter.',
    assigned: 'Sales Department',
    fromDate: '2024-02-15T14:00',
    toDate: '2024-02-15T15:30'
  },
  {
    type: 'event',
    title: 'Company Picnic',
    desc: 'Organize a fun-filled company picnic event.',
    assigned: 'Employee Engagement Committee',
    fromDate: '2024-02-18T11:30',
    toDate: '2024-02-18T15:00'
  },
  {
    type: 'general',
    title: 'Customer Feedback Analysis',
    desc: 'Analyze customer feedback data for improvements.',
    assigned: 'Customer Experience Team'
  },
  {
    type: 'meeting',
    title: 'Client Contract Discussion',
    desc: 'Discuss contract terms with a client.',
    assigned: 'Legal and Sales Teams',
    fromDate: '2024-02-22T09:30',
    toDate: '2024-02-22T11:00'
  },
  {
    type: 'event',
    title: 'Annual Company Retreat',
    desc: 'Plan and organize the annual company retreat.',
    assigned: 'Organizational Development Team',
    fromDate: '2024-02-25T13:00',
    toDate: '2024-02-25T17:00'
  },
  {
    type: 'general',
    title: 'Supply Chain Optimization',
    desc: 'Optimize supply chain processes for efficiency.',
    assigned: 'Supply Chain Management'
  },
  {
    type: 'meeting',
    title: 'Team Performance Review',
    desc: 'Review team performance and set goals.',
    assigned: 'Team Leads',
    fromDate: '2024-02-28T10:00',
    toDate: '2024-02-28T12:00'
  },
  {
    type: 'event',
    title: 'Company Gala Dinner',
    desc: 'Plan a grand gala dinner for company stakeholders.',
    assigned: 'Event Planning Committee',
    fromDate: '2024-03-02T18:30',
    toDate: '2024-03-02T22:00'
  },
  {
    type: 'general',
    title: 'Internal Audit Preparation',
    desc: 'Prepare for the upcoming internal audit process.',
    assigned: 'Audit and Compliance Team'
  },
  {
    type: 'meeting',
    title: 'Strategic Planning Session',
    desc: 'Discuss and plan long-term strategic initiatives.',
    assigned: 'Leadership Team',
    fromDate: '2024-03-05T09:00',
    toDate: '2024-03-05T12:00'
  }
] as TASK[];

mockTaskList.forEach((task) => {
  // @ts-ignore
  task.id = nanoid();
  // @ts-ignore
  task.createDate = getRandomDateFromPastMonth();
  // @ts-ignore
  task.updateDate = getRandomDateFromPastMonth();
})
