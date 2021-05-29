import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {Store} from '@ngrx/store';
import * as reducersFromAuth from './redux/auth.reducer';
import * as AuthActions from './redux/auth.actions';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<reducersFromAuth.AuthState>, private authService: AuthService) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        this.ensureAuthenticated();
        return this.authService.isAuthenticated;
    }

    /** Если пользователь не аутентифицирован - перенаправляем на Login page. */
    protected ensureAuthenticated() {
        console.log('ensureAuthenticated');
        if (!this.authService.isAuthenticated) {
            this.store.dispatch(new AuthActions.Login());
        }
    }
}
