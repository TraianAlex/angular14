# Angular14

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

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

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Rapid BE

## From the project folder:
`json-server --watch src/assets/db.json --port 8080`
### - port and routes are optional depending on your api endpoint path

## Or with docker
`docker run -d -p 8080:80 -v /Users/traianalexandru/projects/opusone/ang-material/src/assets/db.json:/data/db.json clue/json-server`

`docker stop <container-hash>`

`docker start <container-hash>`
