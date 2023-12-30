# Task Management Application

A Task Management Application built with Angular, utilizing RxJS and Reactive Forms. This application allows users to manage various types of tasks dynamically and efficiently.

## Features

### Task Creation

- Dynamic rendering of task fields based on task type selection (General/Meeting/Event)
- Common task title field across all task types

### Task Update

- Editing task details such as description or due date
- Primary task fields disabled for editing when appropriate
- Viewing tasks in a list format for easy reference

### Sorting and Filtering

- Sorting tasks based on creation or edit date
- Filtering tasks based on any task fields
- Retaining filters and sorting order on page refresh

## Installation

1. Clone the repository
2. Install dependencies: `yarn install`
3. Run the application: `yarn start`

## Usage

1. Select task type (General/Meeting/Event) to add a new task.
2. Fill in the relevant task fields based on the selected type.
3. Edit tasks by modifying description, due date, etc.
4. View and manage tasks in the list view.

## Technologies Used

- [Angular](https://angular.io/)
- [RxJS](https://angular.io/guide/rx-library)
- [Reactive Forms](https://angular.io/guide/reactive-forms)
- [XtremeUI (Developed and maintained by me)](https://github.com/itzzritik/XtremeUI)
