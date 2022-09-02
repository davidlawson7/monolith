import { CmiEnvironment } from '@utils';
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment: CmiEnvironment = {
  production: false,
  development: true,
  cognito: {
    UserPoolId: 'ap-southeast-2_AWC5Vvk7j',
    ClientId: '719l0mgjlbjqiaetlqjc7t9hud',
  },
  // DONT COMMIT THESE
  login: {
    code: '+61',
    mobile: '452300117',
    password: 'Meliodas1!',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
