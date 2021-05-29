import {Actions, Effect, ofType} from '@ngrx/effects';
import {AuthService} from '../auth.service';
import {
    AuthActionTypes,
    Authenticate,
    ConfirmMail,
    HandleAuthenticate,
    Login,
    Logout,
    LogoutSuccess
} from './auth.actions';
import {map, switchMap, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
import {ServiceResponse} from "../../../shared/domain/ServiceResponse";
import {of} from "rxjs";

@Injectable()
export class AuthEffects {

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) { }

    @Effect({ dispatch: false }) login$ = this.actions$.pipe(
        ofType<Login>(AuthActionTypes.Login),
        tap(() => { this.authService.doLogin(); })
    );

    @Effect({ dispatch: false }) logout$ = this.actions$.pipe(
        ofType<Logout>(AuthActionTypes.Logout),
        switchMap(() => {
            this.authService.doLogout();
            return of('');
        }),
        map(() => new LogoutSuccess())
    );

    @Effect() authenticate$ = this.actions$.pipe(
        ofType<Authenticate>(AuthActionTypes.Authenticate),
        switchMap(action => {
            const payload = action.formValues;
            return this.authService.login(payload);
        }),
        map((response: ServiceResponse) => new HandleAuthenticate(response))
    );

    @Effect() confirmMail$ = this.actions$.pipe(
        ofType<ConfirmMail>(AuthActionTypes.ConfirmMail),
        switchMap(action => {
            return this.authService.confirmMail(action.code);
        }),
        map((response: ServiceResponse) => new HandleAuthenticate(response))
    );
}
