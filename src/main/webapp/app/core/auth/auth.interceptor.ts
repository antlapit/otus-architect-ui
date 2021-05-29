import {AuthService} from './auth.service';
import {Injectable, Injector} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import * as reducersFromAuth from './redux/auth.reducer';
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private authService: AuthService;

    constructor(private store: Store<reducersFromAuth.AuthState>,
                private injector: Injector) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authService = this.getAuthService();
        request = request.clone({
            setHeaders: {
                Authorization: !authService ? '' : authService.getAuthorizationHeaderValue(),
                'X-XSRF-TOKEN': (!authService || !authService.getCsrfToken()) ? '' : authService.getCsrfToken()
            }
        });

        return next.handle(request).pipe(catchError((error, caught) => {
            this.handleAuthError(error);
            return of(error);
        }) as any);
    }

    getAuthService(): AuthService {
        if (typeof this.authService === 'undefined') {
            this.authService = this.injector.get(AuthService);
        }
        return this.authService;
    }

    handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            // FIXME вернуть this.store.dispatch(new AuthActions.Login());
            // нужно добавить проверку, что запрос может упасть по 401 на публичных ресурсах
            // return of(err.message);
        }
        throw err;
    }

}
