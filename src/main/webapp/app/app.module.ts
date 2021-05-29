import {BrowserModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {reducer as fromAuthReducer} from './core/auth/redux/auth.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterModule} from '@angular/router';
import {AppRouting} from './app.routing';
import {AppLoadModule} from './core/app-load/app-load.module';
import {registerLocaleData} from '@angular/common';
import localeRuRu from '@angular/common/locales/ru';
import {ApplicationModule} from './application/application.module';

import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MainViewContainerComponent} from './shared/main-view-container/main-view-container.component';
import {UnauthorizedContainerComponent} from './shared/unauthorized-container/unauthorized-container.component';
import {HttpModule} from '@angular/http';
import {SimpleFormContainerComponent} from './shared/simple-form-container/simple-form-container.component';
import {GestureConfig} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';

registerLocaleData(localeRuRu);

@NgModule({
    declarations: [
        AppComponent,
        MainViewContainerComponent,
        UnauthorizedContainerComponent,
        SimpleFormContainerComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TextMaskModule,
        HttpModule,
        HttpClientModule,
        StoreModule.forRoot({
            routerReducer: routerReducer,
            ...fromAuthReducer
        }),
        EffectsModule.forRoot([]),
        StoreDevtoolsModule.instrument({
            maxAge: 15
        }),
        RouterModule,
        AppRouting,
        StoreRouterConnectingModule.forRoot(),
        AppLoadModule.forChild(),
        ApplicationModule
    ],
    providers: [
        {provide: LOCALE_ID, useValue: 'ru-ru'},
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
