import { InjectionToken } from '@angular/core';

import { environment } from 'src/environments/environment';

export interface AppConfig {
  api: string;
}

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
  api: environment.api,
};
