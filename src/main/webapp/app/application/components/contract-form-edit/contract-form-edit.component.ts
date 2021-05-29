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
import {Contract} from '../../models/fin-application.model';
import {ApplicationState} from '../../redux/application-state';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {INN_PATTERN, NUMERIC_PATTERN} from '../../../app.constants';

@Component({
    selector: 'otus-architect-contract-form-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contract-form-edit.component.html',
    styleUrls: ['./contract-form-edit.component.scss']
})
export class ContractFormEditComponent implements OnInit, OnDestroy {

    @Input()
    set contract(val: any) {
        this._contract = val;
        if (!!this.fg) {
            this.fg.patchValue(this._contract, {emitEvent: false});
        }
    }

    _contract: Contract;

    @Input()
    loading: boolean;

    matcher = new CustomErrorStateMatcher();
    fg: FormGroup;

    private all$: Subscription = new Subscription();

    @Output()
    changes = new EventEmitter<Contract>();

    constructor(private _fb: FormBuilder,
                private changeDetector: ChangeDetectorRef,
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
            number: ['', []],
            customerInn: ['', [Validators.required, Validators.pattern(INN_PATTERN)]],
            contractObject: ['', [Validators.required]],
            lot: ['', [Validators.required, Validators.min(1), Validators.pattern(NUMERIC_PATTERN)]],
            advance: ['', []]
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
        this.fg.patchValue(this._contract, {emitEvent: false});
    }

    valid() {
        this.formValidatorService.validateAllFormFields(this.fg);
        this.changeDetector.detectChanges();

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
