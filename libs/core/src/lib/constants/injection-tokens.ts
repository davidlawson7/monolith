import { InjectionToken } from '@angular/core';

import { CmiEnvironment } from '@utils';

export const ENVIRONMENT = new InjectionToken<CmiEnvironment>('Environment');
