# Overview

Ths is the source for my personal portfolio, and frontend playground.

### The project techstack

|The thing|... and what it is for|
|:--------|:-----------|
|[Node (v6)](https://nodejs.org)|a javascript runtime that uses an event-driven, non-blocking I/O model - (**npm** is the package manager for node)|
|[React](https://facebook.github.io/react/)|a view layer for dynamic web apps|
|[Webpack](https://webpack.github.io)|a module bundler for javascript projects|
|[Leaflet](http://leafletjs.com/)|open-source JavaScript library for mobile-friendly interactive maps|
|[Karma](http://karma-runner.github.io/1.0/config/configuration-file.html)|a unit testing framework|


# Usage

## Install & Run

Install:
`git clone https://whereismytransport.visualstudio.com/Product/_git/HydraUI`

DEVELOPMENT

|*yarn* command|*npm* command|what it does|
|:-|:-|:-|
|`npm install`|`yarn`| installs all dependencies for this project|
|`yarn dev`|`npm run dev`|runs `webpack-dev-server` on `src/` ... served on [http://localhost:8080](http://localhost:8080)|

PRODUCTION

|*yarn* command|*npm* command|what it does|
|:-|:-|:-|
|`yarn build`|`npm run build`| creates `dist`, containing app bundle|
|`yarn serve`|`npm run serve`| serves folder in `dist` using `server.js`|
|`yarn build-prod`|`npm run build-prod`|creates `artifact/dist`, containing `server.js`|
|`yarn start`|`npm start`| simulates prodction server `artifact/server.js`|


To run the production release build and generate the `dist` folder, use the following commands:
### NPM scripts:

The project uses webpack as the module bundler `npm` scripts to run tasks. With these two combined you can build, run, package etc. your application. Several `npm` scripts have been created for basic common tasks, found in `package.json`. 

Run these scripts with the command `npm run {{script-name}}`:

| script         | action       |
| :------------- |:-------------|
|`"start"`|runs the dev server locally on the specified port|
| `"setup"`| installs all dependencies and runs the dev server|
|`"prod"`| runs the node application using `server.js`|
|`"test"`| runs unit tests using karma|
|`"build"`| creates a production build of the app in `./dist`|
|`"clean"`| deletes the `./dist` folder|