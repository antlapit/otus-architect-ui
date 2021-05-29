import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChildren
} from '@angular/core';
import {FinApplicationForm} from '../../application/models/fin-application.model';
import {Country} from '../domain/Country';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../application/redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, of, Subscription} from 'rxjs';
import {
    confirmStayDocumentTypes,
    countries,
    docAbsenceReasons,
    identityDocumentTypes,
    isLoadingConfirmStayDocumentTypes,
    isLoadingCountries,
    isLoadingDocAbsenceReasons,
    isLoadingIdentityDocumentTypes,
    isLoadingTaxationSystems,
    taxationSystems
} from '../redux/general.selectors';
import {CustomErrorStateMatcher} from '../form-validator/custom-error-state.matcher';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
    ACCOUNT_PATTERN,
    ADDRESS_PATTERN,
    BIK_PATTERN,
    dateChangeInput,
    INN_PATTERN,
    PASSPORT_ISSUED_BY_PATTERN,
    RU_CODE_DIVISION_PATTERN,
    RU_PASSPORT_NUMBER_PATTERN,
    RU_PASSPORT_SERIES_PATTERN
} from '../../app.constants';
import {FormValidatorService} from '../form-validator/form-validator.service';
import {debounceTime, distinctUntilChanged, startWith} from 'rxjs/operators';
import {DocAbsenceReason} from '../domain/DocAbsenceReason';
import {ConfirmStayDocumentType} from '../domain/ConfirmStayDocumentType';
import {IdentityDocumentType} from '../domain/IdentityDocumentType';
import {AddressAutocompleteComponent} from '../address-autocomplete/address-autocomplete.component';
import {TaxationSystem} from '../domain/TaxationSystem';
import {PersonForm} from '../../application/models/general.model';
import {CurrencyMaskConfig} from 'ng2-currency-mask/src/currency-mask.config';
import * as moment from 'moment';

@Component({
    selector: 'otus-architect-fin-application-form-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fin-application-form-edit.component.html',
    styleUrls: ['./fin-application-form-edit.component.scss']
})
export class FinApplicationFormEditComponent implements OnInit, OnDestroy {

    @Input()
    set form(val: any) {
        this._form = val;
        if (!!this.fg) {
            this.fg.patchValue(this._form, {emitEvent: false});
            this.refreshValidators(this._form.resident);
            this.cd.detectChanges();
        }
    }

    _form: FinApplicationForm;

    @Input()
    loading: boolean;

    @Output()
    changes = new EventEmitter<PersonForm>();

    country: Country;
    migrationCardNotRequired: boolean;
    migrationCardValueNotRequired: boolean;
    migrationCardAbsenceNotRequired: boolean;
    migrationCardIsTemplate: boolean;

    visaNotRequired: boolean;
    visaValueNotRequired: boolean;
    visaAbsenceNotRequired: boolean;
    visaAbsenceIsTemplate: boolean;

    isLoadingCountries: boolean;
    countries: Country[];

    isLoadingIdentityDocumentTypes: boolean;
    identityDocumentTypes: IdentityDocumentType[];

    isLoadingConfirmStayDocumentTypes: boolean;
    confirmStayDocumentTypes: ConfirmStayDocumentType[];

    isLoadingDocAbsenceReasons: boolean;
    docAbsenceReasons: DocAbsenceReason[];

    isLoadingTaxationSystems: boolean;
    taxationSystems: TaxationSystem[];

    matcher = new CustomErrorStateMatcher();
    fg: FormGroup;

    minBirthDate: Date;
    maxBirthDate: Date;
    maxIssueDate: Date;

    TODAY_DATE: Date;

    addressFormConfig = {
        id: [null, []],
        addressTypeId: [null, []],
        value: [null, [Validators.required, Validators.pattern(ADDRESS_PATTERN)]]
    };

    addressFormReadonlyConfig = {
        id: [null, []],
        addressTypeId: [null, []],
        value: [null, []]
    };

    currencyMaskConfig: CurrencyMaskConfig = {
        align: 'left',
        allowNegative: false,
        decimal: ',',
        precision: 0,
        prefix: '',
        suffix: '',
        thousands: ' '
    };

    @ViewChildren(AddressAutocompleteComponent)
    private addressAutocompleteComponents: QueryList<AddressAutocompleteComponent>;

    private all$: Subscription = new Subscription();

    constructor(private _fb: FormBuilder,
                private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private formValidatorService: FormValidatorService) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.TODAY_DATE = new Date();
        this.TODAY_DATE.setHours(0, 0, 0, 0);

        this.minBirthDate = new Date();
        this.minBirthDate.setFullYear(this.minBirthDate.getFullYear() - 100);
        this.minBirthDate.setHours(0, 0, 0, 0);
        this.maxBirthDate = new Date();
        this.maxBirthDate.setFullYear(this.maxBirthDate.getFullYear() - 18);
        this.maxBirthDate.setHours(0, 0, 0, 0);
        this.maxIssueDate = this.TODAY_DATE;

        this.fg = this._fb.group({
            id: ['', []],
            name: ['', [Validators.required]],
            inn: ['', [Validators.pattern(INN_PATTERN)]],
            birthDate: ['', this._form.ip ? [Validators.required] : []],
            placeOfBirth: ['', this._form.ip ? [Validators.required] : []],
            series: ['',  this._form.ip ? (this._form.resident ? [Validators.required, Validators.pattern(RU_PASSPORT_SERIES_PATTERN)] : []) : []],
            number: ['',  this._form.ip ? (this._form.resident ? [Validators.required, Validators.pattern(RU_PASSPORT_NUMBER_PATTERN)] : [Validators.required]) : []],
            issueDate: ['',  this._form.ip ? [Validators.required, this.formValidatorService.passportDateValidator] : []],
            issuedBy: ['',  this._form.ip ? [Validators.required, Validators.pattern(PASSPORT_ISSUED_BY_PATTERN)] : []],
            codeDivision: ['',  this._form.ip ? (this._form.resident ? [Validators.required, Validators.pattern(RU_CODE_DIVISION_PATTERN)] : []) : []],
            roleId: ['', []],
            percent: ['', []],
            resident: ['', []],
            externalId: ['', []],
            regAddress: this._fb.group(this._form.ip ? this.addressFormConfig : this.addressFormReadonlyConfig),
            factAddress: this._fb.group(this._form.ip ? this.addressFormConfig : this.addressFormReadonlyConfig),
            equalAddress: this._fb.control(null, []),
            citizenshipId: ['', []],
            migrationCardPresented: ['', []],
            migrationCardSeries: ['', []],
            migrationCardNumber: ['', []],
            migrationCardFromDate: ['', []],
            migrationCardToDate: ['', []],
            migrationCardAbsenceReasonTemplate: ['', []],
            migrationCardAbsenceReason: ['', []],
            visaPresented: ['', []],
            visaSeries: ['', []],
            visaNumber: ['', []],
            visaFromDate: ['', []],
            visaToDate: ['', []],
            visaAbsenceReasonTemplate: ['', []],
            visaAbsenceReason: ['', []],
            regDocumentTypeId: ['',  this._form.ip ? [Validators.required] : []],
            visaDocumentTypeId: ['', []],
            ip: ['', []],
            taxationSystemId: ['', [Validators.required]],
            taxationSystemEditable: ['', []],
            report: this._fb.group({
                param2110: ['', [Validators.required, Validators.min(1)]],
                param2400: ['', [Validators.required, Validators.min(1)]],
                param1300: ['', [Validators.required, Validators.min(1)]],
                param1600: ['', [Validators.required, Validators.min(1)]],
            }),
            account: this._fb.group({
                id: ['', []],
                account: ['', [Validators.required, Validators.pattern(ACCOUNT_PATTERN)]],
                bik: ['', [Validators.required, Validators.pattern(BIK_PATTERN)]],
                bank: ['', []],
            })
        });
        this.all$.add(
            this.fg.valueChanges.pipe(
                debounceTime(1500),
                distinctUntilChanged()
            ).subscribe(value => {
                if (!!value && !!value.id) {
                    this.changes.emit(value);
                }
            })
        );
        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingDocAbsenceReasons)),
                this.store.pipe(select(docAbsenceReasons)),
                of(this._form.migrationCardAbsenceReason),
                of(this._form.visaAbsenceReason)
            ).subscribe(
                ([isLoadingDocAbsenceReasons, docAbsenceReasons, migrationCardAbsenceReason, visaAbsenceReason]) => {
                    this.isLoadingDocAbsenceReasons = isLoadingDocAbsenceReasons;
                    this.docAbsenceReasons = docAbsenceReasons;

                    if (!isLoadingDocAbsenceReasons && !!docAbsenceReasons && docAbsenceReasons.length > 0) {
                        if (!!migrationCardAbsenceReason || !!visaAbsenceReason) {
                            let notTemplateReason = null;
                            this.migrationCardIsTemplate = false;
                            this.visaAbsenceIsTemplate = false;

                            for (const doc of docAbsenceReasons) {
                                const reason = (doc as DocAbsenceReason);
                                if (reason.type !== 'TEMPLATE') {
                                    notTemplateReason = reason.title; // находим пункт, не являющийся шаблоном
                                }
                                if (reason.title === migrationCardAbsenceReason) {
                                    this.migrationCardIsTemplate = true;
                                    this.fg.get('migrationCardAbsenceReasonTemplate').patchValue(reason.title, {emitEvent: false});
                                }
                                if (reason.title === visaAbsenceReason) {
                                    this.visaAbsenceIsTemplate = true;
                                    this.fg.get('visaAbsenceReasonTemplate').patchValue(reason.title, {emitEvent: false});
                                }
                            }

                            if (!this.migrationCardIsTemplate) {
                                this.fg.get('migrationCardAbsenceReasonTemplate').patchValue(notTemplateReason, {emitEvent: false});
                            }
                            if (!this.migrationCardIsTemplate) {
                                this.fg.get('visaAbsenceReasonTemplate').patchValue(notTemplateReason, {emitEvent: false});
                            }
                        }
                    }

                    this.cd.detectChanges();
                }
            )
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingIdentityDocumentTypes)),
                this.store.pipe(select(identityDocumentTypes)),
                this.fg.get('regDocumentTypeId').valueChanges.pipe(
                    startWith(this._form.regDocumentTypeId)
                ),
            ).subscribe(([isLoadingIdentityDocumentTypes, identityDocumentTypes, regDocumentTypeId]) => {
                this.isLoadingIdentityDocumentTypes = isLoadingIdentityDocumentTypes;
                this.identityDocumentTypes = identityDocumentTypes;

                if (!!this.identityDocumentTypes) {
                    let resident = true;
                    if (!!regDocumentTypeId) {
                        const doc = this.findById(this.identityDocumentTypes, regDocumentTypeId);
                        if (!!doc) {
                            resident = (doc as IdentityDocumentType).resident;
                        }
                    }
                    if (this.fg.get('resident').value !== resident) {
                        this.fg.get('resident').patchValue(resident);
                    }
                }

                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingConfirmStayDocumentTypes)),
                this.store.pipe(select(confirmStayDocumentTypes)),
                this.fg.get('visaDocumentTypeId').valueChanges.pipe(
                    startWith(this._form.visaDocumentTypeId)
                )
            ).subscribe(([isLoadingConfirmStayDocumentTypes, confirmStayDocumentTypes, visaDocumentTypeId]) => {
                this.isLoadingConfirmStayDocumentTypes = isLoadingConfirmStayDocumentTypes;
                this.confirmStayDocumentTypes = confirmStayDocumentTypes;

                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingCountries)),
                this.store.pipe(select(countries)),
                this.fg.get('citizenshipId').valueChanges.pipe(
                    startWith(this._form.citizenshipId)
                ),
                this.fg.get('resident').valueChanges.pipe(
                    startWith(this._form.resident)
                ),
                this.fg.get('migrationCardPresented').valueChanges.pipe(
                    startWith(this._form.migrationCardPresented)
                ),
                this.fg.get('visaPresented').valueChanges.pipe(
                    startWith(this._form.visaPresented)
                )
            ).subscribe(([isLoadingCountries, countries,
                             citizenshipId, resident, migrationCardPresented, visaPresented]) => {
                this.isLoadingCountries = isLoadingCountries;
                this.countries = countries;
                if (!!this.countries && !!citizenshipId) {
                    this.country = this.findById(this.countries, citizenshipId);
                } else {
                    // FIXME изменить на true, когда подключатся справочники
                    this.country = {
                        visa: false,
                        migrationCard: false
                    };
                }
                this.migrationCardNotRequired = resident || !this.country || !this.country.migrationCard;
                this.migrationCardValueNotRequired = this.migrationCardNotRequired || !migrationCardPresented;
                this.migrationCardAbsenceNotRequired = this.migrationCardNotRequired || migrationCardPresented;

                this.visaNotRequired = resident || !this.country || !this.country.visa;
                this.visaValueNotRequired = this.visaNotRequired || !visaPresented;
                this.visaAbsenceNotRequired = this.visaNotRequired || visaPresented;

                this.refreshValidators(this._form.resident);

                this.cd.detectChanges();
            })
        );

        this.all$.add(this.fg.get('migrationCardAbsenceReasonTemplate').valueChanges.subscribe(value => {
            for (const doc of this.docAbsenceReasons) {
                const reason = (doc as DocAbsenceReason);
                if (value === reason.title) {
                    this.migrationCardIsTemplate = reason.type === 'TEMPLATE';
                    this.fg.get('migrationCardAbsenceReason').patchValue(this.migrationCardIsTemplate ? value : 'Введите причину');
                    break;
                }
            }
        }));

        this.all$.add(this.fg.get('visaAbsenceReasonTemplate').valueChanges.subscribe(value => {
            for (const doc of this.docAbsenceReasons) {
                const reason = (doc as DocAbsenceReason);
                if (value === reason.title) {
                    this.visaAbsenceIsTemplate = reason.type === 'TEMPLATE';
                    this.fg.get('visaAbsenceReason').patchValue(this.visaAbsenceIsTemplate ? value : 'Введите причину');
                    break;
                }
            }
        }));

        this.all$.add(this.fg.get('equalAddress').valueChanges.subscribe(value => {
            const factVal = this.fg.get('factAddress').get('value');
            if (value) {
                // tslint:disable-next-line:max-line-length
                factVal.setValue((<AbstractControl>this.fg.get('regAddress').get('value')).value, {
                    emitEvent: false
                });
            } else {
                factVal.setValue('', {
                    emitEvent: false
                });
            }
        }));
        this.all$.add(this.fg.get('regAddress').get('value').valueChanges.subscribe(value => {
            if (this.fg.get('equalAddress').value) {
                this.fg.get('factAddress').get('value').setValue(value, {
                    emitEvent: false
                });
            }
        }));

        this.all$.add(
            combineLatest(
                this.store.pipe(select(isLoadingTaxationSystems)),
                this.store.pipe(select(taxationSystems)),
                this.fg.get('taxationSystemId').valueChanges.pipe(
                    startWith(this._form.taxationSystemId)
                )
            ).subscribe(([isLoadingTaxationSystems, taxationSystems, taxationSystemId]) => {
                this.isLoadingTaxationSystems = isLoadingTaxationSystems;
                this.taxationSystems = taxationSystems;

                this.cd.detectChanges();
            })
        );

        this.fg.patchValue(this._form, {emitEvent: false});
    }

    private findById(reference: any[], id: string): any {
        if (id) {
            for (const ref of reference) {
                if (ref['id'] === id) {
                    return ref;
                }
            }
        }
        return null;
    }

    valid() {
        this.formValidatorService.validateAllFormFields(this.fg);
        let allEmbedValid = true;
        for (const autocomplete of this.addressAutocompleteComponents.toArray()) {
            allEmbedValid = allEmbedValid && autocomplete.valid();
        }

        this.cd.detectChanges();
        if (this.fg.valid && allEmbedValid) {
            return true;
        } else {
            this.formValidatorService.scrollToError();
            return false;
        }
    }

    castToFormGroup(account: AbstractControl): FormGroup {
        return account as FormGroup;
    }

    modifyBankName($event: String) {
        this.fg.controls.account.patchValue({bank: $event});
    }

    onDateChange($event: Event, yearStrict2000: boolean, control: AbstractControl) {
        const targetValue = ($event.target as any).value;
        const newValue = dateChangeInput($event, yearStrict2000);
        if (!!newValue && targetValue !== newValue && newValue.length === 10) {
            const parsedMoment = moment.utc(newValue, 'DD.MM.YYYY');
            if (parsedMoment.isValid()) {
                control.patchValue(parsedMoment.toISOString());
            }
        }
    }

    private refreshValidators(resident: boolean) {
        if (!!this.fg) {
            return;
        }
        this.fg.get('series').setValidators(
            this._form.ip ? (resident ? [Validators.required, Validators.pattern(RU_PASSPORT_SERIES_PATTERN)] : []) : []
        );

        this.fg.get('number').setValidators(
            this._form.ip ? (resident ? [Validators.required, Validators.pattern(RU_PASSPORT_NUMBER_PATTERN)] : [Validators.required]): []
        );

        this.fg.get('codeDivision').setValidators(
            this._form.ip ? (resident ? [Validators.required, Validators.pattern(RU_CODE_DIVISION_PATTERN)] : []) : []
        );
    }

    getValue() {
        return this.fg.getRawValue();
    }
}
