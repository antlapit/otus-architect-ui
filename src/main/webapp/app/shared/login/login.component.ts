import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../form-validator/form-validator.service';
import {ApplicationState} from '../../application/redux/application-state';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, Subscription, timer} from 'rxjs';
import {LoginState} from '../../core/domain/LoginState';
import {FIO_PATTERN, MAIL_PATTERN} from '../../app.constants';
import {Authenticate, LoginSuccess, ReloadAuthenticate} from '../../core/auth/redux/auth.actions';
import {getLoginState, isAuthenticating} from '../../core/auth/redux/auth.selectors';
import {map, take} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {ShowGeneralToastMessage} from '../redux/general.actions';

@Component({
    selector: 'otus-architect-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

    fg: FormGroup;
    isAuthenticating: boolean;
    operation = 'LOGIN';
    loginState: LoginState;

    milliSecondToRetry: number;
    retryCounter$: Observable<number>;

    private all$: Subscription = new Subscription();
    private appName: any;
    private offerLink: any;

    constructor(private _fb: FormBuilder,
                private formValidatorService: FormValidatorService,
                private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            if (!!config && !!config.application) {
                this.appName = config.application.name;
                this.offerLink = config.application.offerLink;
            }
        });
    }

    ngOnInit() {
        this.fg = this._fb.group({
            phoneNumber: ['', [Validators.required]],
            role: ['', []],
            name: ['', Validators.pattern(FIO_PATTERN)],
            email: ['', [Validators.email, Validators.pattern(MAIL_PATTERN)]],
            loginCode: ['', []]
        });
        this.fg.patchValue({role: 'AGENT'});

        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);


        this.all$.add(
            combineLatest(
                this.store.pipe(select(isAuthenticating)),
                this.store.pipe(select(getLoginState)),
            ).subscribe(([isAuthenticating, loginState]) => {
                this.isAuthenticating = isAuthenticating;
                this.loginState = loginState;
                this.processCurrentState(this.loginState);
                if (!this.isAuthenticating && this.loginState
                    && (this.loginState.status === 'SMS' || this.loginState.status == 'EMAIL_CONFIRMATION')) {
                    this.initTimer();
                }
                if (this.isAuthenticating) {
                    this.fg.disable({emitEvent: false});
                } else if (!this.isAuthenticating) {
                    this.fg.enable({emitEvent: false});
                }
                this.cd.detectChanges();
            })
        );

        this.all$.add(
            combineLatest(
                this.store.pipe(select(getLoginState)),
            ).subscribe(([loginState]) => {
                if (!!loginState && !!loginState.error) {
                    this.store.dispatch(new ShowGeneralToastMessage({
                        severity: 'error',
                        summary: loginState.error,
                        detail: loginState.error
                    }));
                }
                this.cd.detectChanges();
            })
        );

    }

    ngOnDestroy(): void {
        if (this.all$) {
            this.all$.unsubscribe();
        }
    }

    proceedLogin() {
        this.formValidatorService.validateAllFormFields(this.fg);
        if (this.fg.valid) {
            const formValues = this.fg.getRawValue();
            formValues['phoneNumber'] = formValues['phoneNumber'].replace(/[^0-9]/gi, '');
            formValues['operation'] = this.operation;
            formValues['appName'] = this.appName;
            this.store.dispatch(new Authenticate(formValues));
        } else {
            this.formValidatorService.scrollToError();
        }
    }

    changeRole($event: any) {
        this.fg.patchValue({role: $event.index === 0 ? 'AGENT' : 'CLIENT'});
    }

    private initTimer(): void {
        this.milliSecondToRetry = 180000;
        this.retryCounter$ = timer(0, 1000).pipe(
            take(this.milliSecondToRetry),
            map(() => {
                this.milliSecondToRetry -= 1000;
                if (this.milliSecondToRetry < 0) {
                    this.milliSecondToRetry = 0;
                }
                return this.milliSecondToRetry;
            })
        );
    }

    private processCurrentState(state: LoginState) {
        if (!state || state.status === 'INITIAL') {
            this.fg.get('phoneNumber').setValidators([Validators.required]);
            this.fg.get('loginCode').setValidators([]);
            this.fg.get('name').setValidators([]);
            this.fg.get('email').setValidators([]);
            this.fg.get('companyInn').setValidators([]);
            this.operation = 'LOGIN';
        } else if (state.status === 'SMS') {
            this.fg.get('loginCode').setValidators([Validators.required, Validators.minLength(state.loginCodeLength), Validators.maxLength(state.loginCodeLength)]);
            this.fg.get('name').setValidators([]);
            this.fg.get('email').setValidators([]);
            this.fg.get('companyInn').setValidators([]);
            this.operation = 'SMS_LOGIN';
        } else if (state.status === 'REGISTER') {
            this.fg.get('loginCode').setValidators([Validators.required]);
            this.fg.get('name').setValidators([Validators.required, Validators.pattern(FIO_PATTERN)]);
            this.fg.get('email').setValidators([Validators.required, Validators.email]);
            this.fg.get('companyInn').setValidators(this.fg.getRawValue()['role'] === 'AGENT' ? Validators.required : []);
            this.operation = 'REGISTER';
        } else if (state.status === 'EMAIL_CONFIRMATION') {
            // ничего не надо, только уведомление
        } else if (state.status === 'AUTHENTICATED') {
            this.store.dispatch(new LoginSuccess());
        }

        for (const controlsKey in this.fg.controls) {
            this.fg.get(controlsKey).markAsUntouched({onlySelf: true});
        }
    }

    requestLoginCode() {
        const rawValue = this.fg.getRawValue();
        if (this.loginState.status === 'SMS') {
            this.fg.get('loginCode').setValidators([]);
            this.fg.patchValue({loginCode: null}, {emitEvent: false});
            this.operation = 'LOGIN';
        } else if (this.loginState.status === 'EMAIL_CONFIRMATION') {
            this.operation = 'EMAIL_CODE';
        }
        this.proceedLogin();
    }

    reloadState() {
        this.store.dispatch(new ReloadAuthenticate(this.fg.getRawValue()['phoneNumber']));
    }
}
