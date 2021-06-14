import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../form-validator/form-validator.service';
import {ApplicationState} from '../../application/redux/application-state';
import {select, Store} from '@ngrx/store';
import {combineLatest, Subscription} from 'rxjs';
import {LoginState} from '../../core/domain/LoginState';
import {Authenticate, LoginSuccess} from '../../core/auth/redux/auth.actions';
import {getLoginState, isAuthenticating} from '../../core/auth/redux/auth.selectors';
import {ActivatedRoute, Router} from '@angular/router';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {ShowGeneralToastMessage} from '../redux/general.actions';
import {AuthService} from "../../core/auth/auth.service";

@Component({
    selector: 'otus-architect-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit, OnDestroy {

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
                private configService: AppConfigService,
                public router: Router,
                public authService: AuthService) {
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


    }

    ngOnDestroy(): void {
        if (this.all$) {
            this.all$.unsubscribe();
        }
    }

    proceedLogin() {
        this.formValidatorService.validateAllFormFields(this.fg);
        if (this.fg.valid) {
            this.all$.add(this.authService.register(this.fg.getRawValue())
                .subscribe(resp => {
                    if (resp.success) {
                        this.router.navigate(['/login']);
                    } else {
                        this.store.dispatch(new ShowGeneralToastMessage(
                            resp.message
                        ));
                    }
                })
            );
        } else {
            this.formValidatorService.scrollToError();
        }
    }
}
