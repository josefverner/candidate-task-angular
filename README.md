## Before you start

Make sure that you have installed the following tools, the versions used to build and run the app are listed below:

1. [Node.js](https://nodejs.org/), used version `v20.14.0`.
2. [npm](https://www.npmjs.com/), used version `10.0.8`.
3. [Angular CLI](https://angular.io/cli), used version `17.0.3`.

## Installation instructions

1. Clone the repository.
2. Run `npm install` to install the dependencies.

## Running the app

1. Run `ng serve` to start the development server.
2. Navigate to `http://localhost:4200/` to view the app.

## Running the tests

Run `ng test` to run the unit tests.

## Application description

The app is a simple Angular application that displays a list of users. The user data is fetched from a mock API on start and displayed on dashboard. The user can click on a user to view more details.

Users with different roles have different permissions to view users and edit users. The roles are as follows:

- **Admin:** Can view all the users and is allowed to edit users.
- **Manager:** Can view users active and inactve users and has permission to change user's status and role.
- **User:** Can only view the active users and isn't allowed to edit users.

The apllication will store the user data in the local storage and will be available on page reload. To reset the data, you can clear the local storage.
