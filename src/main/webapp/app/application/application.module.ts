import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {RouterStateSerializer} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';

import {CoreModule} from '../core/core.module';
import {SharedModule} from '../shared/shared.module';

import {ApplicationPathRouting} from './application.routing';
import * as Reducers from './redux/reducers';
import * as Selectors from './redux/selectors';
import {CustomRouterStateSerializer} from './redux/router-state';
import {EscapeHtmlPipe, TrimPipe} from './pipes';
import {ApiService} from './services/api.service';
import {
    ApplicationFormComponent,
    CatalogComponent,
    DashboardComponent,
    ProductFormComponent,
    SettingsComponent,
} from './pages';
import {
    ApplicationButtonsComponent,
    ApplicationListComponent,
    ApplicationListFilterComponent,
    ApplicationProcessedViewComponent,
    ApplicationStageTabsComponent,
    ProductListComponent,
    UserMoneyPanelComponent,
    UserProfilePanelComponent
} from './components';
import {FinApplicationEffects, FinApplicationReferencesEffects, ProductEffects} from './redux/effects';
import {FinApplicationService} from './services/fin-application.service';
import {FinApplicationReferencesService} from './services/fin-application-references.service';
import {FileUploadModule} from 'ng2-file-upload';
import {DateAdapter, GestureConfig, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {MomentUtcDateAdapter} from '../shared/date/moment-utc-date.adapter';
import {ApplicationComponent} from './application.component';
import {ApplicationCompleteViewComponent} from './components/application-complete-view/application-complete-view.component';
// tslint:disable-next-line:max-line-length
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {CURRENCY_MASK_CONFIG, CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';
// tslint:disable-next-line:max-line-length
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {TextMaskModule} from 'angular2-text-mask';
import {DeliveryInfoFormEditComponent} from './components/delivery-info/delivery-info-form-edit.component';
import {ProductService} from "./services/product.service";
import {ProductListFilterComponent} from "./components/product-list-filter/product-list-filter.component";
import {ProductCompleteViewComponent} from "./components/product-complete-view/product-complete-view.component";
import {AddProductToOrderPanelComponent} from "./components/add-product-to-order/add-product-to-order-panel.component";
import {UserNotificationPanelComponent} from "./components/user-notification-panel/user-notification-panel.component";

const COMPONENTS = [
    ApplicationButtonsComponent,
    ApplicationComponent,
    ApplicationCompleteViewComponent,
    ApplicationListComponent,
    ApplicationListFilterComponent,
    ApplicationProcessedViewComponent,
    ApplicationStageTabsComponent,
    ProductListComponent,
    ProductCompleteViewComponent,
    ProductListFilterComponent,
    DeliveryInfoFormEditComponent,
    UserProfilePanelComponent,
    UserMoneyPanelComponent,
    AddProductToOrderPanelComponent,
    UserNotificationPanelComponent,
];

const PAGES = [
    SettingsComponent,
    CatalogComponent,
    DashboardComponent,
    ApplicationFormComponent,
    ProductFormComponent
];

const PIPES = [
    TrimPipe,
    EscapeHtmlPipe
];

const MODULES = [
    CommonModule,
    ApplicationPathRouting,
    ReactiveFormsModule,
    FormsModule,
    TextMaskModule,
    StoreModule.forFeature(Selectors.featureName, Reducers.reducer),
    EffectsModule.forFeature([
        FinApplicationEffects,
        FinApplicationReferencesEffects,
        ProductEffects,
    ]),
    CoreModule,
    SharedModule,
    FormsModule,
    CurrencyMaskModule
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: '',
    suffix: '',
    thousands: ' '
};

const PROVIDERS = [
    ApiService,
    FinApplicationService,
    ProductService,
    FinApplicationReferencesService,
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer},
    {provide: DateAdapter, useClass: MomentUtcDateAdapter, deps: [MAT_DATE_LOCALE]},
    {
        provide: MAT_DATE_FORMATS, useValue: {
            parse: {
                dateInput: 'DD.MM.YYYY',
            },
            display: {
                dateInput: 'DD.MM.YYYY',
                monthYearLabel: 'MMM YYYY',
                dateA11yLabel: 'LL',
                monthYearA11yLabel: 'MMMM YYYY',
            },
        }
    },
    {provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig},
    {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
];

@NgModule({
    imports: [
        MODULES,
        FileUploadModule,
        // TODO ???????????? ?????????????????????? ?????????????? ?????? ??????????????
    ],
    declarations: [
        COMPONENTS,
        PAGES,
        PIPES,
    ],
    providers: [
        PROVIDERS
    ],
    exports: [
        CoreModule,
        SharedModule,
    ]
})
export class ApplicationModule {
}
