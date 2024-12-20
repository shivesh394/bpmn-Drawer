# Drawer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7.
It is a BPMN diagram drawer, where you can create diagrams for buissiness processes.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.


## API Reference

#### Get all items

```http
  GET /localhost:8080/files
```



#### Get item

```http
  GET /localhost:8080/upload/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Post item

```http
  POST /localhost:8080/upload
```



#### Update item

```http
  PUT /localhost:8080/files/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |



## Documentation

[Angular Documentation] https://angular.io/docs


## Features

- Easy-to-use BPPMN  diagram editor 
- Many advanced tools
- Create a wide range of diagrams
- Cross platform


## Dependencies

To run this project, you will need to install Angular and run 'npm install'. This will download every dependency.


## Libraries

bpmn-js: https://github.com/bpmn-io/bpmn-js-example-angular
FileSaver.js: https://www.npmjs.com/package/angular-file-saver



## Tech Stack

**Client:** Angular

**Server:** Spring Boot



## Screenshots


![ems1](https://github.com/Nirabhra-Chatterjee/bpmn-Drawer/assets/107489758/6baf9dae-517f-4a5d-9c3b-de0019998ff9)
![ems2](https://github.com/Nirabhra-Chatterjee/bpmn-Drawer/assets/107489758/a6bfbf50-2db0-406a-a566-da40ad9a0e19)
![ems3](https://github.com/Nirabhra-Chatterjee/bpmn-Drawer/assets/107489758/6ae53539-c037-4263-b522-bc5d8ca7d739)
![ems4](https://github.com/Nirabhra-Chatterjee/bpmn-Drawer/assets/107489758/c2db45ac-851b-48f6-81b5-be5f2a347083)


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
