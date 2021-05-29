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
import {ApplicationState} from '../../application/redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CustomErrorStateMatcher} from '../form-validator/custom-error-state.matcher';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../form-validator/form-validator.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ContactInfo} from '../../application/models/general.model';
import {FIO_PATTERN} from '../../app.constants';

@Component({
    selector: 'otus-architect-contact-form-edit',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact-form-edit.component.html',
    styleUrls: ['./contact-form-edit.component.scss']
})
export class ContactFormEditComponent implements OnInit, OnDestroy {

    @Input()
    set contactInfo(val: any) {
        this._contactInfo = val;
        if (!!this.fg) {
            this.fg.patchValue(this._contactInfo, {emitEvent: false});
        }
    }

    _contactInfo: ContactInfo;

    @Input()
    loading: boolean;

    @Output()
    changes = new EventEmitter<ContactInfo>();

    matcher = new CustomErrorStateMatcher();
    fg: FormGroup;

    private all$: Subscription = new Subscription();

    phoneFormConfig = {
        id: [null, []],
        communicationTypeId: [null, []],
        value: [null, [Validators.required]]
    };

    emailFormConfig = {
        id: [null, []],
        communicationTypeId: [null, []],
        value: [null, [Validators.required, Validators.email]]
    };

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
            id: ['', []],
            name: ['', [Validators.required, Validators.pattern(FIO_PATTERN)]],
            phone: this._fb.group(this.phoneFormConfig),
            mail: this._fb.group(this.emailFormConfig),
        });
        this.fg.patchValue(this._contactInfo, {emitEvent: false});
        this.all$.add(
            this.fg.valueChanges.pipe(
                debounceTime(1500),
                distinctUntilChanged()
            ).subscribe(value => {
                if (!!value && !!value.id) {
                    const formValues = value;
                    if (!!formValues['phone'] && !!formValues['phone']['value']) {
                        formValues['phone']['value'] = formValues['phone']['value'].replace(/[^0-9]/gi, '');
                    }
                    this.changes.emit(formValues);
                }
            })
        );
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
        const formValues = this.fg.getRawValue();
        if (!!formValues['phone'] && !!formValues['phone']['value']) {
            formValues['phone']['value'] = formValues['phone']['value'].replace(/[^0-9]/gi, '');
        }
        return formValues;
    }
}
