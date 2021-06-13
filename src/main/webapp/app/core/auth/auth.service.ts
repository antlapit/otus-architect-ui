import {Injectable} from '@angular/core';
import {AppConfigService} from '../app-load/services/app-config.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {UserService} from './user.service';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {ServiceResponse} from '../../shared/domain/ServiceResponse';
import {CSRFService} from './csrf.service';

/** Authentication service */
@Injectable({
    providedIn: 'root'
})
export class AuthService {

    protected config: any = null;

    private authenticated: boolean;

    constructor(private configService: AppConfigService,
                private $localStorage: LocalStorageService,
                private $sessionStorage: SessionStorageService,
                private router: Router,
                private userService: UserService,
                private http: HttpClient,
                private csrfService: CSRFService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    public getAuthorizationHeaderValue(): string {
        return 'Bearer ' + (this.$localStorage.retrieve('authenticationToken') || this.$sessionStorage.retrieve('authenticationToken'));
    }

    /** Признак того, что пользователь аутентифицирован и токен валидный на данный момент */
    public get isAuthenticated(): boolean {
        if (!this.authenticated) {
            this.authenticated = (!!this.$localStorage.retrieve('authenticationToken') || !!this.$sessionStorage.retrieve('authenticationToken'));
        }
        return this.authenticated;
    }

    /** Запустить процесс получения токена аутентификации */
    public doLogin() {
        this.$localStorage.store('loginTargetUrl', this.router.url);
        this.$sessionStorage.store('loginTargetUrl', this.router.url);
        this.router.navigate(['login']);
    }

    /** Запустить процесс завершения аутентифицированного сеанса */
    public doLogout() {
        this.$localStorage.clear('authenticationToken');
        this.$sessionStorage.clear('authenticationToken');
        this.authenticated = false;
    }

    public login(formData): Observable<ServiceResponse> {
        return this.http.post(`${((this.config || {}).backend || {}).host}/api/login`,
            formData,
            {observe: 'response'}
            ).pipe(
                map((response: HttpResponse<Object>) => {
                    const body = response.body;
                    const jwt = body['token'];
                    if (!!jwt) {
                        this.storeAuthenticationToken(jwt);
                    }
                    return new ServiceResponse(response.ok, response.status, null, body);
                }),
                catchError((response: HttpErrorResponse) => {
                    const message = {
                        severity: 'error',
                        summary: 'Ошибка при попытке войти в ЛК',
                        detail: (!response || !response.error) ? null : (!response.error.extMessage ? response.error.title : response.error.extMessage)
                    };
                    return of(new ServiceResponse(response.ok, response.status, message));
                })
            );
    }

    storeAuthenticationToken(jwt) {
        this.authenticated = true;
        this.$sessionStorage.store('authenticationToken', jwt);
    }

    getCsrfToken() {
        return this.csrfService.getCSRF();
    }
}
