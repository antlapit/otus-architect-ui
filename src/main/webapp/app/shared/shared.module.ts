import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {reducer as sharedReducer} from './redux/general.reducer';
import {GeneralEffects as generalEffects} from './redux/general.effects';
import {IdentityPanelComponent} from './identity-panel/identity-panel.component';
import {BusyIndicatorComponent} from './busy-indicator/busy-indicator.component';
import {CoreModule} from '../core/core.module';
import {PlaceholderComponent} from './placeholder/placeholder.component';
import {DateFormatPipe} from './pipes/iso-date.pipe';
import {
    DateAdapter,
    GestureConfig,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
} from '@angular/material';
import {IMaskModule} from 'angular-imask';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {MainMenuComponent} from './main-menu/main-menu.component';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RecaptchaModule} from 'ng-recaptcha';
import {BrowserUpdateComponent} from './browser-update/browser-update.component';
import {CookieModule} from 'ngx-cookie';
import {PromoPanelComponent} from './promo-panel/promo-panel.component';
import {UnauthorizedNavbarComponent} from './unauthorized-navbar/unauthorized-navbar.component';
import {RouterModule} from '@angular/router';
import {GoToWelcomeComponent} from './go-to-welcome/go-to-welcome.component';
import {PhonePipe} from './pipes/phone.pipe';
import {PhoneSecurePipe} from './pipes/phone-secure.pipe';
import {MainNavbarComponent} from './main-navbar/main-navbar.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {TwoTitlesPanelComponent} from './two-titles-panel/two-titles-panel.component';
import {UnauthorizedFooterComponent} from './unauthorized-footer/unauthorized-footer.component';
import {HighlightPipe} from './pipes/highlight.pipe';
import {PersonInitialsPipe} from './pipes/person-initials.pipe';
import {FinApplicationViewCardComponent} from './fin-application-view-card/fin-application-view-card.component';
import {PersonViewCardComponent} from './person-view-card/person-view-card.component';
import {PersonFormEditComponent} from './person-form-edit/person-form-edit.component';
import {AddressAutocompleteComponent} from './address-autocomplete/address-autocomplete.component';
import {CenterSpinnerComponent} from './center-spinner/center-spinner.component';
import {MomentUtcDateAdapter} from './date/moment-utc-date.adapter';
import {SimpleFileComponent} from './simple-file/simple-file.component';
import {ContactViewCardComponent} from './contact-view-card/contact-view-card.component';
import {ContactFormEditComponent} from './contact-form-edit/contact-form-edit.component';
import {FinApplicationFormEditComponent} from './fin-application-form-edit/fin-application-form-edit.component';
import {ProgressBreadcrumbsComponent} from './progress-breadcrumbs/progress-breadcrumbs.component';
import {DateRangePickerComponent} from './date-range-picker/date-range-picker.component';
import {LimitRangePickerComponent} from './limit-range-picker/limit-range-picker.component';
import {CurrencyMaskModule} from 'ng2-currency-mask';
import {SatDatepickerModule, SatNativeDateModule} from 'saturn-datepicker';
import {Ng5SliderModule} from 'ng5-slider';
import {InputWithSliderComponent} from './input-with-slider/input-with-slider.component';
import {HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
import {TextMaskModule} from 'angular2-text-mask';
import {ProcessingDotsComponent} from './processing-dots/processing-dots.component';

/**
 * Shared module.
 * Набор компонентов и сервисов, для повторного использования в приложении.
 * То, что не предназначено для глобального использования.
 */
@NgModule({
    imports: [
        CommonModule,
        CoreModule,
        FormsModule,
        TextMaskModule,
        ReactiveFormsModule,
        RecaptchaModule,
        StoreModule.forFeature('shared', sharedReducer),
        EffectsModule.forFeature([generalEffects]),
        CookieModule.forRoot(),
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        IMaskModule,
        RouterModule,
        CurrencyMaskModule,
        Ng5SliderModule
    ],
    declarations: [
        IdentityPanelComponent,
        DateFormatPipe,
        DateRangePickerComponent,
        PhonePipe,
        PhoneSecurePipe,
        HighlightPipe,
        PersonInitialsPipe,
        BusyIndicatorComponent,
        AddressAutocompleteComponent,
        CenterSpinnerComponent,
        PlaceholderComponent,
        MainMenuComponent,
        LoginComponent,
        BrowserUpdateComponent,
        PromoPanelComponent,
        UnauthorizedNavbarComponent,
        UnauthorizedFooterComponent,
        GoToWelcomeComponent,
        MainNavbarComponent,
        MainFooterComponent,
        TwoTitlesPanelComponent,
        FinApplicationFormEditComponent,
        FinApplicationViewCardComponent,
        ContactViewCardComponent,
        ContactFormEditComponent,
        PersonViewCardComponent,
        PersonFormEditComponent,
        ProgressBreadcrumbsComponent,
        SimpleFileComponent,
        InputWithSliderComponent,
        LimitRangePickerComponent,
        ProcessingDotsComponent
    ],
    exports: [
        IdentityPanelComponent,
        BusyIndicatorComponent,
        AddressAutocompleteComponent,
        CenterSpinnerComponent,
        PlaceholderComponent,
        MainMenuComponent,
        DateFormatPipe,
        DateRangePickerComponent,
        PhonePipe,
        PhoneSecurePipe,
        HighlightPipe,
        PersonInitialsPipe,
        BrowserUpdateComponent,
        PromoPanelComponent,
        UnauthorizedNavbarComponent,
        UnauthorizedFooterComponent,
        MainNavbarComponent,
        MainFooterComponent,
        TwoTitlesPanelComponent,
        GoToWelcomeComponent,
        FinApplicationFormEditComponent,
        FinApplicationViewCardComponent,
        ContactViewCardComponent,
        ContactFormEditComponent,
        PersonViewCardComponent,
        PersonFormEditComponent,
        ProgressBreadcrumbsComponent,
        SimpleFileComponent,
        InputWithSliderComponent,
        LimitRangePickerComponent,
        ProcessingDotsComponent,
        MatAutocompleteModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatExpansionModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatNativeDateModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        SatDatepickerModule,
        SatNativeDateModule,
        MatDatepickerModule,
        IMaskModule,
        Ng5SliderModule
    ],
    providers: [
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
        {provide: HAMMER_GESTURE_CONFIG, useClass: GestureConfig}
    ]
})
export class SharedModule {
}
