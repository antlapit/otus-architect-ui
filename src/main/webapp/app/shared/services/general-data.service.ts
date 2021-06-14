import {Injectable} from '@angular/core';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {UserIdentity} from '../../core/domain/UserIdentity';

@Injectable({
    providedIn: 'root'
})
export class GeneralDataService {

    private config: any;

    constructor(private httpClient: HttpClient, private configService: AppConfigService) {
        this.configService.config$.subscribe(config => this.config = config);
    }

    public getUserInfo(): Observable<UserIdentity> {
        const noCacheKey = new Date().getTime();
        return this.httpClient.get<UserIdentity>(`${((this.config || {}).backend || {}).host}/api/me/profile?noCacheKey=${noCacheKey}`)
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

    public modifyUserInfo(userInfo: any) {
        return this.httpClient.post<UserIdentity>(`${((this.config || {}).backend || {}).host}/api/me/profile`,
            userInfo,
            {
                headers: {
                    'otus-architect-APP-NAME': this.config.application.name
                }
            })
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

    public addMoney(money: any) {
        return this.httpClient.post<UserIdentity>(`${((this.config || {}).backend || {}).host}/api/me/add-money`,
            {
                "money": money
            },
            {
                headers: {
                    'otus-architect-APP-NAME': this.config.application.name
                }
            })
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

}
