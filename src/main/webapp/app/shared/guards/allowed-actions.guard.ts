import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, map, tap} from 'rxjs/operators';
import {RouteData} from '../domain/RouteData';
import {ErrorScope} from '../domain/ErrorScope';
import {ErrorCode} from '../domain/ErrorCode';
import {AuthGuard} from "../../core/auth/auth.guard";
import {AuthService} from "../../core/auth/auth.service";
import * as reducersFromAuth from '../../core/auth/redux/auth.reducer';
import * as reducersFromShared from '../redux/general.reducer';
import * as selectorsFromShared from '../redux/general.selectors';
import * as actionsFromShared from '../redux/general.actions';

@Injectable({providedIn: 'root'})
export class AllowedActionsGuard extends AuthGuard {

    constructor(
    authStore: Store<reducersFromAuth.AuthState>,
    private generalStore: Store<reducersFromShared.GeneralState>,
    authService: AuthService) {
        super(authStore, authService);
    }

    canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.generalStore.pipe(select(selectorsFromShared.getAllowedActions)).pipe(
            tap(() => {
                super.ensureAuthenticated();
            }),
            filter(allowedActions => !!allowedActions),
            map((allowedActions) => {

                const routeData = !!next ? next.data as RouteData : null;
                const isAllowedByAuthGuard = super.canActivate(next, state) as boolean;

                let isRouteAvailable = isAllowedByAuthGuard;
                if (isRouteAvailable && !!routeData && !!routeData.DemandActions) { // Заданы требования к маршруту - проверка
                    routeData.DemandActions.forEach(val => {
                        isRouteAvailable = isRouteAvailable && allowedActions.indexOf(val) > -1;
                    });
                }

                if (!isRouteAvailable) {
                    this.generalStore.dispatch(new actionsFromShared.HandleError(
                        {scope: ErrorScope.AccessDenied, code: ErrorCode.ActionNotAllowed}
                    ));
                }

                return isRouteAvailable;
            })
        );
    }
}
