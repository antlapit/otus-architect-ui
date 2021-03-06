import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../form-validator/form-validator.service';
import {ApplicationState} from '../../application/redux/application-state';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription} from 'rxjs';
import {LoginState} from '../../core/domain/LoginState';
import {Authenticate, LoginSuccess} from '../../core/auth/redux/auth.actions';
import {getLoginState, isAuthenticating} from '../../core/auth/redux/auth.selectors';
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
    hidePassword: boolean = true;
    loginState: LoginState;

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
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });

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
            this.store.dispatch(new Authenticate( this.fg.getRawValue()));
        } else {
            this.formValidatorService.scrollToError();
        }
    }

    private processCurrentState(state: LoginState) {
        if (!!state) {
            this.store.dispatch(new LoginSuccess());

            for (const controlsKey in this.fg.controls) {
                this.fg.get(controlsKey).markAsUntouched({onlySelf: true});
            }
        }
    }
}
