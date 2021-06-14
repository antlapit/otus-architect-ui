import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import {Store} from '@ngrx/store';
import {ActivatedRoute, Router} from '@angular/router';
import {DeliveryInfo} from '../../models/general.model';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {ApplicationState} from '../../redux/application-state';

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
    }

    _deliveryInfo: DeliveryInfo;
    _enableFillLater: boolean;

    @Input()
    loading: boolean;

    @Output()
    changes = new EventEmitter<DeliveryInfo>();

    matcher = new CustomErrorStateMatcher();
    fg: FormGroup;

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
        this.fg = this._fb.group({
            address: ['', [Validators.required]],
            date: ['', [Validators.required]],
        });
        this.all$.add(
            this.fg.valueChanges.pipe(
                debounceTime(1500),
                distinctUntilChanged()
            ).subscribe(value => {
                if (!!value) {
                    this.changes.emit(value);
                }
            })
        );
        this.fg.patchValue(this._deliveryInfo, {emitEvent: false});
    }

    valid() {
        this.formValidatorService.validateAllFormFields(this.fg);
        this.cd.detectChanges();
        if (this.fg.valid) {
            return true;
        } else {
            this.formValidatorService.scrollToError();
            return false;
        }
    }

    getValue() {
        return this.fg.getRawValue();
    }
}
