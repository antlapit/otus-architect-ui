import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../shared/form-validator/form-validator.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {CreateFinApplication} from '../../redux/actions';
import {combineLatest, Subscription} from 'rxjs';
import {isCreatingFinApplication} from '../../redux/selectors';
import {ApplicationMessage} from '../../../shared/domain/ApplicationMessage';
import {CustomErrorStateMatcher} from '../../../shared/form-validator/custom-error-state.matcher';
import {INN_PATTERN} from '../../../app.constants';
import * as GeneralSelectors from '../../../shared/redux/general.selectors';
import {UserIdentity} from '../../../core/domain/UserIdentity';
import {Company} from '../../../core/domain/Company';
import {getFinApplicationCreatingErrorMessage} from 'src/main/webapp/app/application/redux/selectors/fin-application.selectors';

@Component({
    selector: 'otus-architect-new-application',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './new-application.component.html',
    styleUrls: ['./new-application.component.scss']
})
export class NewApplicationComponent implements OnInit, OnDestroy {
    fg: FormGroup;

    lastError: ApplicationMessage;
    isCreatingFinApplication: boolean;

    private all$: Subscription = new Subscription();

    matcher = new CustomErrorStateMatcher();
    userInfo: UserIdentity;
    companyInfo: Company;
    isClient: boolean;

    constructor(private _fb: FormBuilder,
                private formValidatorService: FormValidatorService,
                private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.lastError = null;
        this.fg = this._fb.group({
            clientInn: ['', [Validators.required, Validators.pattern(INN_PATTERN)]],
            contractRegistryNumber: ['', [Validators.required, Validators.pattern('^[0-9]{4,40}$')]],
            sourceHelperInn: ['', [Validators.pattern(INN_PATTERN)]]
        });

        this.all$.add(combineLatest(
            this.store.pipe(select(GeneralSelectors.getUserInfo)),
            this.store.pipe(select(GeneralSelectors.getCompanyInfo))
        ).subscribe(([userInfo, companyInfo]) => {
            this.userInfo = userInfo;
            this.companyInfo = companyInfo;

            if (this.userInfo) {
                // определяем роль - Агент или Клиент
                for (const role of this.userInfo.roles) {
                    if (role === 'ROLE_CLIENT') {
                        this.isClient = true;
                    }
                }
            }
        }));

        this.all$.add(combineLatest(
            this.store.pipe(select(isCreatingFinApplication)),
            this.store.pipe(select(getFinApplicationCreatingErrorMessage)),
        ).subscribe(([isCreatingFinApplication, message]) => {
            this.isCreatingFinApplication = isCreatingFinApplication;
            this.lastError = message;

            if (this.isCreatingFinApplication) {
                this.fg.disable({emitEvent: false});
            } else {
                this.fg.enable({emitEvent: false});
            }
            this.cd.detectChanges();
        }));

        const index = this.router.url.indexOf('clientInn=');
        if (index > -1) {
            this.fg.patchValue({
                clientInn: this.router.url.substring(index + 'clientInn='.length)
            });
        }
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }


    createFinApplication() {
        this.formValidatorService.validateAllFormFields(this.fg);
        this.lastError = null;
        this.cd.detectChanges();
        if (this.fg.valid) {
            const formValues = this.fg.getRawValue();
            this.store.dispatch(new CreateFinApplication(formValues));
        } else {
            this.formValidatorService.scrollToError();
        }
    }
}
