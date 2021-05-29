import {GeneralDataService} from '../services/general-data.service';
import {
    DiscardWorkspace,
    GeneralActionTypes,
    HandleAddressSuggest,
    HandleBankSuggest,
    HandleCompanyInfo,
    HandleCompanySuggest,
    HandleConfirmStayDocumentTypes,
    HandleCountries,
    HandleDocAbsenceReasons,
    HandleError,
    HandleIdentityDocumentTypes,
    HandleProfileInfo,
    HandleTaxationSystems,
    HandleUserInfo,
    HandleWorkspace,
    LoadAddressSuggest,
    LoadBankSuggest,
    LoadCompanyInfo,
    LoadCompanySuggest,
    LoadConfirmStayDocumentTypes,
    LoadCountries,
    LoadDocAbsenceReasons,
    LoadIdentityDocumentTypes,
    LoadProfileInfo,
    LoadTaxationSystems,
    LoadUserInfo,
    LoadWorkspace,
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
import {filter, map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {SuggestService} from '../references/suggest.service';
import {ServiceResponse} from '../domain/ServiceResponse';
import {ReferencesService} from '../references/references.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {AuthService} from '../../core/auth/auth.service';

@Injectable()
export class GeneralEffects {
    constructor(
        private actions$: Actions,
        private generalDataService: GeneralDataService,
        private suggestService: SuggestService,
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
            new LoadWorkspace(),
            new LoadUserInfo(),
            new LoadCompanyInfo(),
            new LoadCountries(),
            new LoadIdentityDocumentTypes(),
            new LoadConfirmStayDocumentTypes(),
            new LoadDocAbsenceReasons(),
            new LoadTaxationSystems(),
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

    @Effect() loadWorkspace$ = this.actions$.pipe(
        ofType<LoadWorkspace>(GeneralActionTypes.LoadWorkspace),
        filter(action => this.authService.isAuthenticated),
        mergeMap(() => this.generalDataService.getUserWorkspace()),
        map(workspace => new HandleWorkspace({ workspace }))
    );

    @Effect({dispatch: false}) handleError$ = this.actions$.pipe(
        ofType<HandleError>(GeneralActionTypes.HandleError),
        tap((action) => {
            setTimeout(() => {
                this.router.navigateByUrl(`${action.payload.scope}/${action.payload.code}`);
            }, 0);
        })
    );

    @Effect() loadProfileInfo$ = this.actions$.pipe(
        ofType<LoadProfileInfo>(GeneralActionTypes.LoadProfileInfo),
        mergeMap(() => this.generalDataService.getProfiles()),
        map(profileInfo => new HandleProfileInfo({ profileInfo }))
    );

    @Effect() loadUserInfo$ = this.actions$.pipe(
        ofType<LoadUserInfo>(GeneralActionTypes.LoadUserInfo),
        filter(action => this.authService.isAuthenticated),
        mergeMap(() => this.generalDataService.getUserInfo()),
        map(userInfo => new HandleUserInfo({ userInfo }))
    );

    @Effect() loadCompanyInfo$ = this.actions$.pipe(
        ofType<LoadCompanyInfo>(GeneralActionTypes.LoadCompanyInfo),
        filter(action => this.authService.isAuthenticated),
        mergeMap(() => this.generalDataService.getCompanyInfo()),
        map(companyInfo => new HandleCompanyInfo({ companyInfo }))
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

    @Effect() loadCompanySuggest$ = this.actions$.pipe(
        ofType<LoadCompanySuggest>(GeneralActionTypes.LoadCompanySuggest),
        mergeMap((action) => this.suggestService.suggestCompany(action.payload.query, action.payload.count)),
        map((response: ServiceResponse) => new HandleCompanySuggest(response))
    );

    @Effect() loadAddressSuggest$ = this.actions$.pipe(
        ofType<LoadAddressSuggest>(GeneralActionTypes.LoadAddressSuggest),
        mergeMap((action) => this.suggestService.suggestAddress(action.payload.query, action.payload.count)),
        map((response: ServiceResponse) => new HandleAddressSuggest(response))
    );

    @Effect() loadBankSuggest$ = this.actions$.pipe(
        ofType<LoadBankSuggest>(GeneralActionTypes.LoadBankSuggest),
        mergeMap((action) => this.suggestService.suggestBank(action.payload.query, action.payload.count)),
        map((response: ServiceResponse) => new HandleBankSuggest(response))
    );

    @Effect() loadCountries$ = this.actions$.pipe(
        ofType<LoadCountries>(GeneralActionTypes.LoadCountries),
        filter(action => this.authService.isAuthenticated),
        mergeMap((action) => this.referencesService.getCountries()),
        map((response: ServiceResponse) => new HandleCountries(response))
    );

    @Effect() loadIdentityDocumentTypes$ = this.actions$.pipe(
        ofType<LoadIdentityDocumentTypes>(GeneralActionTypes.LoadIdentityDocumentTypes),
        filter(action => this.authService.isAuthenticated),
        mergeMap((action) => this.referencesService.getIdentityDocumentTypes()),
        map((response: ServiceResponse) => new HandleIdentityDocumentTypes(response))
    );

    @Effect() loadConfirmStayDocumentTypes$ = this.actions$.pipe(
        ofType<LoadConfirmStayDocumentTypes>(GeneralActionTypes.LoadConfirmStayDocumentTypes),
        filter(action => this.authService.isAuthenticated),
        mergeMap((action) => this.referencesService.getConfirmStayDocumentTypes()),
        map((response: ServiceResponse) => new HandleConfirmStayDocumentTypes(response))
    );

    @Effect() loadDocAbsenceReasons$ = this.actions$.pipe(
        ofType<LoadDocAbsenceReasons>(GeneralActionTypes.LoadDocAbsenceReasons),
        filter(action => this.authService.isAuthenticated),
        mergeMap((action) => this.referencesService.getDocAbsenceReasons()),
        map((response: ServiceResponse) => new HandleDocAbsenceReasons(response))
    );

    @Effect() loadTaxationSystems$ = this.actions$.pipe(
        ofType<LoadTaxationSystems>(GeneralActionTypes.LoadTaxationSystems),
        filter(action => this.authService.isAuthenticated),
        mergeMap((action) => this.referencesService.getTaxationSystems()),
        map((response: ServiceResponse) => new HandleTaxationSystems(response))
    );
}
