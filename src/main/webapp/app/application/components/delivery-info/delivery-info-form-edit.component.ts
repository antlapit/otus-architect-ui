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
import {select, Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliveryInfo} from '../../models/general.model';
import {combineLatest, Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {ADDRESS_PATTERN, FIO_PATTERN} from '../../../app.constants';
import {AddressAutocompleteComponent} from '../../../shared/address-autocomplete/address-autocomplete.component';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {deliveryTypes, isLoadingDeliveryTypes} from '../../redux/selectors';
import {ApplicationState} from '../../redux/application-state';
import {DeliveryType} from '../../models/references.model';

@Component({
    selector: 'otus-architect-delivery-info-form-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './delivery-info-form-edit.component.html',
    styleUrls: ['./delivery-info-form-edit.component.scss']
})
export class DeliveryInfoFormEditComponent implements OnInit, OnDestroy {

    @Input()
    set deliveryInfo(val: any) {
        this._deliveryInfo = val;
        if (!!this.fg && !!this._deliveryInfo) {
            if (!!this._deliveryInfo.address && !this._enableFillLater
                    && this.FILL_LATER_ADDRESS === this._deliveryInfo.address.value) {
                this._deliveryInfo.address.value = null;
            }
            this.fg.patchValue(this._deliveryInfo, {emitEvent: false});

            this.recalculateDeliveryType(!!this._deliveryInfo ? this._deliveryInfo.type : null);
        }
    }

    @Input('enableFillLater')
    set enableFillLater(val: any) {
        this._enableFillLater = val;
        if (!!this.fg && !val) {
            this.fg.patchValue({fillLater: false});
        }
    }

    @Input('typeEditable')
    typeEditable: boolean;

    _deliveryInfo: DeliveryInfo;
    _enableFillLater: boolean;

    @Input()
    loading: boolean;

    @Output()
    changes = new EventEmitter<DeliveryInfo>();

    matcher = new CustomErrorStateMatcher();
    fg: FormGroup;

    FILL_LATER_ADDRESS = 'Определится после выпуска';

    private all$: Subscription = new Subscription();

    @ViewChildren(AddressAutocompleteComponent)
    private addressAutocompleteComponents: QueryList<AddressAutocompleteComponent>;

    isLoadingDeliveryTypes: boolean;
    deliveryTypes: DeliveryType[];

    selectedDeliveryType: DeliveryType;

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
        this.fg = this._fb.group({
            type: ['', [Validators.required]],
            address: this._fb.group({
                id: [null, []],
                addressTypeId: [null, []],
                value: [null, [Validators.required, Validators.pattern(ADDRESS_PATTERN)]]
            }),
            tel: ['', [Validators.required]],
            fio: ['', [Validators.required]],
            fillLater: ['', []]
        });
        this.all$.add(
            this.fg.valueChanges.pipe(
                debounceTime(1500),
                distinctUntilChanged()
            ).subscribe(value => {
                if (!!value) {
                    this.recalculateDeliveryType(value.type);
                }
                if (!!value) {
                    this.changes.emit(value);
                }
            })
        );
        this.all$.add(
            this.fg.controls.fillLater.valueChanges.subscribe(
                value => {
                    this.fg.controls.tel.setValidators(value ? [] : [Validators.required]);
                    this.fg.controls.fio.setValidators(value ? [] : [Validators.required]);
                    (this.fg.controls.address as FormGroup).controls.value.setValidators(value ? [] : [Validators.required, Validators.pattern(ADDRESS_PATTERN)]);
                    if (value) {
                        (this.fg.controls.address as FormGroup).controls.value.setValue(this.FILL_LATER_ADDRESS);
                    } else {
                        if (this.FILL_LATER_ADDRESS === ((this.fg.controls.address as FormGroup).controls.value.value)) {
                            (this.fg.controls.address as FormGroup).controls.value.setValue(null);
                        }
                    }
                })
        );

        this.all$.add(combineLatest(
            this.store.pipe(select(isLoadingDeliveryTypes)),
            this.store.pipe(select(deliveryTypes)),
        ).subscribe(([isLoadingDeliveryTypes, deliveryTypes]) => {
            this.isLoadingDeliveryTypes = isLoadingDeliveryTypes;
            this.deliveryTypes = deliveryTypes;
            if (!!this.deliveryTypes) {
                this.recalculateDeliveryType(!!this._deliveryInfo ? this._deliveryInfo.type : null);
            }
            this.cd.detectChanges();
        }));

        if (!!this._deliveryInfo) {
            if (!!this._deliveryInfo.address && this.FILL_LATER_ADDRESS === this._deliveryInfo.address.value) {
                if (this._enableFillLater) {
                    this._deliveryInfo.fillLater = true;
                } else {
                    this._deliveryInfo.address.value = null;
                }
            }
            this.fg.patchValue(this._deliveryInfo, {emitEvent: false});
        }
    }

    valid() {
        if (this.fg.controls.fillLater.value && this._enableFillLater) {
            return true;
        }
        this.formValidatorService.validateAllFormFields(this.fg);
        let allAddressesValid = true;
        for (const autocomplete of this.addressAutocompleteComponents.toArray()) {
            allAddressesValid = allAddressesValid && autocomplete.valid();
        }

        this.cd.detectChanges();
        if (this.fg.valid && allAddressesValid) {
            return true;
        } else {
            this.formValidatorService.scrollToError();
            return false;
        }
    }

    private findByValue(reference: DeliveryType[], value: string): DeliveryType {
        if (value) {
            for (const ref of reference) {
                if (ref['value'] === value) {
                    return ref;
                }
            }
        }
        return null;
    }

    private recalculateDeliveryType(type: string) {
        this.selectedDeliveryType = this.findByValue(this.deliveryTypes, type);
        if (!!this.fg) {
            (this.fg.get('address') as FormGroup).get('value').setValidators(
                !!this.selectedDeliveryType && !!this.selectedDeliveryType.addressRequired ?
                    [Validators.required, Validators.pattern(ADDRESS_PATTERN)] : []
            );
            this.fg.get('fio').setValidators(
                !!this.selectedDeliveryType && !!this.selectedDeliveryType.validateFio ?
                    [Validators.required, Validators.pattern(FIO_PATTERN)] : [Validators.required]
            );
        }
    }

    getValue() {
        return this.fg.getRawValue();
    }
}
