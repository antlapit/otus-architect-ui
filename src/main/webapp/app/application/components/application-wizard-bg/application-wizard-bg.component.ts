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
    deliveryInfo,
    isLoadingDeliveryInfo,
    isProcessingFinApplicationForm,
    isSavingDeliveryInfo,
} from '../../redux/selectors';
import {FinApplication} from '../../models/fin-application.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {
    GetDeliveryTypes,
    LoadDeliveryInfo,
    ProcessFinApplication,
    UpdateDeliveryInfo
} from '../../redux/actions';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {DeliveryInfo} from '../../models/general.model';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
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
    isLoadingDeliveryInfo: boolean;
    deliveryInfo: DeliveryInfo;
    fg: FormGroup;

    private all$: Subscription = new Subscription();

    @ViewChildren(DeliveryInfoFormEditComponent)
    private deliveryInfoFormEditComponents: QueryList<DeliveryInfoFormEditComponent>;

    TODAY_DATE: Date;

    isSavingDeliveryInfo: boolean;
    isProcessingForm: boolean;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router,
                private _fb: FormBuilder,
                private formValidatorService: FormValidatorService,
                protected configService: AppConfigService) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
        this.TODAY_DATE = new Date();
        this.TODAY_DATE.setHours(0, 0, 0, 0);

        this.fg = this._fb.group({
            id: ['', []],
            multiplier: ['', []],
            startDate: ['', [Validators.required]],
            endDate: ['', [Validators.required]],
            kind: ['', [Validators.required]],
            rateFact: ['', []],
            commission: ['', []],
            agentCommission: ['', []]
        });

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
            } else {
                this.fg.patchValue({
                    limit: this.fg.value['limit'] / 1.5
                }, {
                    emitEvent: false,
                    onlySelf: true
                });
                // tslint:disable-next-line:max-line-length
            }
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isProcessingFinApplicationForm)),
            this.store.pipe(select(isSavingDeliveryInfo))
        ).subscribe(([isProcessingForm, isSavingDeliveryInfo]) => {
            this.isProcessingForm = isProcessingForm;
            this.isSavingDeliveryInfo = isSavingDeliveryInfo;
            this.cd.detectChanges();
        }));

        this.store.dispatch(new GetDeliveryTypes());

        this.fg.patchValue(this.selectedFinApplication, {emitEvent: false});

        this.store.dispatch(new LoadDeliveryInfo({
            id: this.selectedFinApplication.orderId
        }));
    }

    processForm() {
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
                id: this.selectedFinApplication.orderId,
            }, false));
        } else {
            this.formValidatorService.scrollToError();
        }

    }

    onDeliveryInfoChange($event: DeliveryInfo) {
        this.store.dispatch(new UpdateDeliveryInfo({
            id: this.selectedFinApplication.orderId,
            deliveryInfo: $event
        }));
    }

}
