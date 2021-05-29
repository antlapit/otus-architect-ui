import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    ViewChildren
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest, Subscription} from 'rxjs';
import {
    contract,
    deliveryInfo,
    deliveryTypes,
    isLoadingContract,
    isLoadingDeliveryInfo,
    isProcessingFinApplicationForm,
    isSavingContract,
    isSavingDeliveryInfo,
    kinds
} from '../../redux/selectors';
import {Contract, FinApplication} from '../../models/fin-application.model';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {
    GetDeliveryTypes,
    GetKinds,
    LoadContract,
    LoadDeliveryInfo,
    LoadFinApplicationForm,
    ProcessFinApplication,
    SaveFinApplication,
    UpdateContract,
    UpdateDeliveryInfo
} from '../../redux/actions';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {ContractFormEditComponent} from '../contract-form-edit/contract-form-edit.component';
import {DeliveryInfo} from '../../models/general.model';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {dateChangeInput} from '../../../app.constants';
import * as moment from 'moment';
import {DeliveryInfoFormEditComponent} from '../delivery-info/delivery-info-form-edit.component';

@Component({
    selector: 'otus-architect-application-wizard-bg',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-bg.component.html',
    styleUrls: ['./application-wizard-bg.component.scss']
})
export class ApplicationWizardBgComponent implements OnInit, OnDestroy {

    matcher = new CustomErrorStateMatcher();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    deliveryTypes: any[];
    kinds: any[];
    isLoadingContract: boolean;
    contract: Contract;
    isLoadingDeliveryInfo: boolean;
    deliveryInfo: DeliveryInfo;
    fg: FormGroup;

    private all$: Subscription = new Subscription();

    @ViewChildren(DeliveryInfoFormEditComponent)
    private deliveryInfoFormEditComponents: QueryList<DeliveryInfoFormEditComponent>;

    @ViewChildren(ContractFormEditComponent)
    private contractFormEditComponents: QueryList<ContractFormEditComponent>;

    // даты гарантии
    minGuaranteeStartDate: Date;
    minGuaranteeEndDate: Date;
    maxGuaranteeEndDate: Date;

    config: any;
    maxInputLimit: number;
    maxLimit: number;
    minLimit: number;

    TODAY_DATE: Date;

    isSavingDeliveryInfo: boolean;
    isSavingContract: boolean;
    isProcessingForm: boolean;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private _fb: FormBuilder,
                private formValidatorService: FormValidatorService,
                protected configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            // tslint:disable-next-line:max-line-length
            this.maxInputLimit = (!this.config || !this.config.application || !this.config.application.order) ? 0 : this.config.application.order.maxInputLimit;
            // tslint:disable-next-line:max-line-length
            this.maxLimit = (!this.config || !this.config.application || !this.config.application.order) ? 0 : this.config.application.order.maxLimit;
            // tslint:disable-next-line:max-line-length
            this.minLimit = (!this.config || !this.config.application || !this.config.application.order) ? 0 : this.config.application.order.minLimit;
        });
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.TODAY_DATE = new Date();
        this.TODAY_DATE.setHours(0, 0, 0, 0);
        this.minGuaranteeStartDate = this.TODAY_DATE;

        this.fg = this._fb.group({
            id: ['', []],
            limit: ['', [Validators.required, Validators.max(this.maxInputLimit), Validators.min(this.minLimit)]],
            multiplier: ['', []],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            kind: ['', [Validators.required]],
            rateFact: ['', []],
            commission: ['', []],
            agentCommission: ['', []]
        });

        this.all$.add(combineLatest(
            this.store.pipe(select(deliveryTypes)),
            this.store.pipe(select(kinds))
        ).subscribe(([deliveryTypes, kinds]) => {
            this.deliveryTypes = deliveryTypes;
            this.kinds = kinds;
            this.refreshGuaranteeEndDateLimits();
            this.cd.detectChanges();
        }));

        this.all$.add(this.fg.valueChanges.pipe(
            debounceTime(1500),
            distinctUntilChanged()
        ).subscribe(value => this.save(value)));

        // @ts-ignore
        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingContract)),
            this.store.pipe(select(contract)),
        ).subscribe(([isLoadingContract, contract]) => {
            this.isLoadingContract = isLoadingContract;
            this.contract = contract;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingDeliveryInfo)),
            this.store.pipe(select(deliveryInfo)),
        ).subscribe(([isLoadingDeliveryInfo, deliveryInfo]) => {
            this.isLoadingDeliveryInfo = isLoadingDeliveryInfo;
            this.deliveryInfo = deliveryInfo;
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.fg.controls.multiplier.valueChanges
        ).subscribe(([multiplier]) => {
            if (multiplier) {
                this.fg.patchValue({
                    limit: this.fg.value['limit'] * 1.5
                }, {
                    emitEvent: false,
                    onlySelf: true
                });
                this.fg.controls.limit.setValidators([Validators.required, Validators.max(this.maxLimit), Validators.min(this.minLimit)]);
                this.fg.controls.limit.disable({onlySelf: true, emitEvent: false});
            } else {
                this.fg.patchValue({
                    limit: this.fg.value['limit'] / 1.5
                }, {
                    emitEvent: false,
                    onlySelf: true
                });
                // tslint:disable-next-line:max-line-length
                this.fg.controls.limit.setValidators([Validators.required, Validators.max(this.maxInputLimit), Validators.min(this.minLimit)]);
                this.fg.controls.limit.enable({onlySelf: true, emitEvent: false});
            }
        }));

        this.all$.add(combineLatest(
            this.fg.controls.startDate.valueChanges
        ).subscribe(([startDate]) => {
            this.refreshGuaranteeEndDateLimits();
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.fg.controls.kind.valueChanges
        ).subscribe(([kind]) => {
            this.refreshGuaranteeEndDateLimits();
            this.cd.detectChanges();
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isProcessingFinApplicationForm)),
            this.store.pipe(select(isSavingContract)),
            this.store.pipe(select(isSavingDeliveryInfo))
        ).subscribe(([isProcessingForm, isSavingContract, isSavingDeliveryInfo]) => {
            this.isProcessingForm = isProcessingForm;
            this.isSavingContract = isSavingContract;
            this.isSavingDeliveryInfo = isSavingDeliveryInfo;
            this.cd.detectChanges();
        }));

        this.store.dispatch(new GetDeliveryTypes());
        this.store.dispatch(new GetKinds());

        this.fg.patchValue(this.selectedFinApplication, {emitEvent: false});

        // валидаторы дат гарантии
        if (this.selectedFinApplication.multiplier) {
            // tslint:disable-next-line:max-line-length
            this.fg.controls.limit.setValidators([Validators.required, Validators.max(this.maxLimit), Validators.min(this.minLimit)]);
            this.fg.controls.limit.disable({onlySelf: true, emitEvent: false});
        } else {
            // tslint:disable-next-line:max-line-length
            this.fg.controls.limit.setValidators([Validators.required, Validators.max(this.maxInputLimit), Validators.min(this.minLimit)]);
            this.fg.controls.limit.enable({onlySelf: true, emitEvent: false});
        }

        this.store.dispatch(new LoadFinApplicationForm({
            id: this.selectedFinApplication.id
        }));
        this.store.dispatch(new LoadContract({
            id: this.selectedFinApplication.id
        }));
        this.store.dispatch(new LoadDeliveryInfo({
            id: this.selectedFinApplication.id
        }));

        this.refreshGuaranteeEndDateLimits();
    }

    save(value: FinApplication) {
        if (value.startDate) {
            if (new Date(value.startDate) < this.minGuaranteeStartDate) {
                value.startDate = this.minGuaranteeStartDate.toISOString();
            }
        }
        if (value.endDate) {
            if (new Date(value.endDate) > this.maxGuaranteeEndDate) {
                value.endDate = this.maxGuaranteeEndDate.toISOString();
            }
        }
        value.limit = this.fg.controls.limit.value; // так как поле может быть неактивно
        this.store.dispatch(new SaveFinApplication(value, true, {}, false));
    }

    processForm() {
        for (const contractFormEdit of this.contractFormEditComponents.toArray()) {
            if (!contractFormEdit.valid()) {
                return;
            }
        }

        const value = this.fg.getRawValue();
        this.formValidatorService.validateAllFormFields(this.fg);
        this.cd.detectChanges();
        if (this.fg.valid) {
            for (const deliveryInfoFormEdit of this.deliveryInfoFormEditComponents.toArray()) {
                if (!deliveryInfoFormEdit.valid()) {
                    return;
                }
            }

            this.store.dispatch(new ProcessFinApplication({
                id: this.selectedFinApplication.id,
                data: {
                    application: value,
                    contract: (!!this.contractFormEditComponents && this.contractFormEditComponents.length > 0)
                        ? this.contractFormEditComponents.first.getValue() : null,
                    deliveryInfo: (!!this.deliveryInfoFormEditComponents && this.deliveryInfoFormEditComponents.length > 0)
                        ? this.deliveryInfoFormEditComponents.first.getValue() : null
                }
            }, false));
        } else {
            this.formValidatorService.scrollToError();
        }

    }

    onContractChange($event: Contract) {
        this.store.dispatch(new UpdateContract({
            id: this.selectedFinApplication.id,
            contract: $event
        }));
    }

    onDeliveryInfoChange($event: DeliveryInfo) {
        this.store.dispatch(new UpdateDeliveryInfo({
            id: this.selectedFinApplication.id,
            deliveryInfo: $event
        }));
    }

    refreshGuaranteeEndDateLimits() {
        this.minGuaranteeEndDate = this.calcMinGuaranteeEndDate();
        this.maxGuaranteeEndDate = this.calcMaxGuaranteeEndDate();
    }

    calcMinGuaranteeEndDate(): Date {
        if (this.fg.get('startDate').value) {
            const dt = new Date(this.fg.get('startDate').value);
            dt.setHours(0, 0, 0, 0);
            dt.setDate(dt.getDate() + 1);
            return dt;
        } else {
            return this.TODAY_DATE;
        }
    }

    calcMaxGuaranteeEndDate(): Date {
        let dt = new Date(this.TODAY_DATE);
        if (this.fg.get('startDate').value) {
            dt = new Date(this.fg.get('startDate').value);
            dt.setHours(0, 0, 0, 0);
        }

        if (this.fg.get('kind').value) {
            const kind = this.findByValue(!!this.kinds ? this.kinds : [], this.fg.get('kind').value);
            if (!kind) {
                dt.setDate(dt.getDate() + 1);
            } else {
                dt.setMonth(dt.getMonth() + (kind.months % 12));
                dt.setFullYear(dt.getFullYear() + (kind.months / 12));
            }
        } else {
            dt.setDate(dt.getDate() + 1);
        }
        return dt;
    }

    private findByValue(kindReferences: any[], value: string): any {
        if (value) {
            for (const ref of kindReferences) {
                if (ref['value'] === value) {
                    return ref;
                }
            }
        }
        return null;
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

    forceSave() {
        const value = this.fg.getRawValue();
        this.store.dispatch(new SaveFinApplication(
            value,
            false,
            {
                application: value,
                contract: (!!this.contractFormEditComponents && this.contractFormEditComponents.length > 0)
                    ? this.contractFormEditComponents.first.getValue() : null,
                deliveryInfo: (!!this.deliveryInfoFormEditComponents && this.deliveryInfoFormEditComponents.length > 0)
                    ? this.deliveryInfoFormEditComponents.first.getValue() : null
            },
            true
        ));
    }
}
