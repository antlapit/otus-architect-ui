import {GeneralDataService} from '../services/general-data.service';
import {
    DiscardWorkspace,
    GeneralActionTypes,
    HandleCategories,
    HandleError,
    HandleUserInfo,
    HandleWorkspace,
    LoadCategories,
    LoadUserInfo,
    ModifyUserInfo,
    RedirectAfterLogin,
    RedirectAfterLogout
} from './general.actions';
import {AuthActionTypes, LoginSuccess, LogoutSuccess} from '../../core/auth/redux/auth.actions';
import {Router} from '@angular/router';
import {GeneralState} from './general.reducer';
import {Store} from '@ngrx/store';
import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {filter, map, mapTo, mergeMap, switchMap, tap} from 'rxjs/operators';
import {ServiceResponse} from '../domain/ServiceResponse';
import {ReferencesService} from '../references/references.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AuthService} from '../../core/auth/auth.service';
import {timer} from "rxjs";

@Injectable()
export class GeneralEffects {
    constructor(
        private actions$: Actions,
        private generalDataService: GeneralDataService,
        private referencesService: ReferencesService,
        private router: Router,
        private store: Store<GeneralState>,
        private $localStorage: LocalStorageService,
        private $sessionStorage: SessionStorageService,
        private authService: AuthService,
    ) { }

    @Effect() loginSuccess$ = this.actions$.pipe(
        ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
        switchMap(value => [
            new LoadUserInfo(),
            new LoadCategories(),
            new RedirectAfterLogin()
        ])
    );

    @Effect() logout$ = this.actions$.pipe(
        ofType<LogoutSuccess>(AuthActionTypes.LogoutSuccess),
        switchMap(value => [
            new DiscardWorkspace(),
            new RedirectAfterLogout()
        ])
    );

    @Effect({dispatch: false}) handleError$ = this.actions$.pipe(
        ofType<HandleError>(GeneralActionTypes.HandleError),
        tap((action) => {
            setTimeout(() => {
                this.router.navigateByUrl(`${action.payload.scope}/${action.payload.code}`);
            }, 0);
        })
    );

    @Effect() loadUserInfo$ = this.actions$.pipe(
        ofType<LoadUserInfo>(GeneralActionTypes.LoadUserInfo),
        switchMap(action =>
            timer(0, 10000).pipe(mapTo(action))
        ),
        filter(action => this.authService.isAuthenticated),
        mergeMap(() => this.generalDataService.getUserInfo()),
        map(userInfo => new HandleUserInfo({ userInfo }))
    );

    @Effect() modifyUserInfo$ = this.actions$.pipe(
        ofType<ModifyUserInfo>(GeneralActionTypes.ModifyUserInfo),
        mergeMap((action) => this.generalDataService.modifyUserInfo(action.payload.userInfo)),
        map(userInfo => new LoadUserInfo())
    );

    @Effect({dispatch: false}) redirectAfterLogin$ = this.actions$.pipe(
        ofType<RedirectAfterLogin>(GeneralActionTypes.RedirectAfterLogin),
        tap((action) => {
            console.log('redirect after login');
            setTimeout(() => {
                var url = this.$sessionStorage.retrieve('loginTargetUrl');
                this.$sessionStorage.clear('loginTargetUrl');
                if (!url) {
                    url = this.$localStorage.retrieve('loginTargetUrl');
                    this.$localStorage.clear('loginTargetUrl');
                }
                // FIXME редирект на прямую ссылку this.router.navigate([!url ? '' : url]);
                this.router.navigate(['']);
            }, 0);
        })
    );

    @Effect({dispatch: false}) redirectAfterLogout$ = this.actions$.pipe(
        ofType<RedirectAfterLogout>(GeneralActionTypes.RedirectAfterLogout),
        tap((action) => {
            setTimeout(() => {
                this.router.navigate(['']);
            }, 0);
        })
    );

    @Effect() loadCountries$ = this.actions$.pipe(
        ofType<LoadCategories>(GeneralActionTypes.LoadCategories),
        mergeMap((action) => this.referencesService.getCategories()),
        map((response: ServiceResponse) => new HandleCategories(response))
    );

}
