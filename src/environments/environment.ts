// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURLCovid: 'https://coronavirus-19-api.herokuapp.com',
  mapboxAPIKey: 'pk.eyJ1IjoiZWxtYXJyb2NvIiwiYSI6ImNrN3l2dW13MjAwMmMzZm1zZTBna2k5eXAifQ.w3kghcFTuWHIrMUDZVfDhw',
  apiURLMapbox: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  newsAPIKey: '0f93121d19014f179b4e4917cabf827d',
  apiURLNews: `https://newsapi.org/v2`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
