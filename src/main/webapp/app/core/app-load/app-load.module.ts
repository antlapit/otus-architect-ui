import {APP_INITIALIZER, InjectionToken, ModuleWithProviders, NgModule} from '@angular/core';
import {AuthModule} from '../auth/auth.module';
import {AppLoadService} from './services/app-load.service';
import * as CoreActions from '../redux/core.actions';
import {AppConfigService} from './services/app-config.service';

export const APP_LOAD_CONFIGURATION = new InjectionToken<(path: string[]) => any>('APP_LOAD_CONFIGURATION');

export function factoryAppConfigService (appConfig: AppConfigService) {
  return () => {
    return appConfig.loadAppConfig();
  };
}

export function factoryAppLoadService<Payload extends CoreActions.InitializationPayload>(
    appLoadService: AppLoadService<Payload>) {
      return () => {
        return appLoadService.initialize();
      };
}

@NgModule({
  imports: [
    AuthModule,
  ]
})
export class AppLoadModule {
  static forChild(): ModuleWithProviders {
    return {
      ngModule: AppLoadModule,
      providers: [
        AppConfigService,
        {
          provide: APP_INITIALIZER,
          useFactory: factoryAppConfigService,
          deps: [AppConfigService],
          multi: true
        },
        AppLoadService,
        {
          provide: APP_INITIALIZER,
          useFactory: factoryAppLoadService,
          deps: [AppLoadService],
          multi: true
        }
      ]
    };
  }
}
