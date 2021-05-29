import {Injectable} from '@angular/core';
import {Workspace} from '../domain/Workspace';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {ProfileInfo} from '../domain/ProfileInfo';
import {UserIdentity} from '../../core/domain/UserIdentity';
import {Company} from '../../core/domain/Company';

@Injectable({
    providedIn: 'root'
})
export class GeneralDataService {

    private config: any;

    constructor(private httpClient: HttpClient, private configService: AppConfigService) {
        this.configService.config$.subscribe(config => this.config = config);
    }

    public getUserWorkspace(): Observable<Workspace> {
        return this.httpClient.get<Workspace>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/workspace`)
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

    public getProfiles(): Observable<ProfileInfo> {
        return this.httpClient.get<Workspace>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/management/info`)
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

    public getUserInfo(): Observable<UserIdentity> {
        return this.httpClient.get<UserIdentity>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/user`)
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }

    public modifyUserInfo(userInfo: any) {
        return this.httpClient.post<UserIdentity>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/user`,
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

    public getCompanyInfo() {
        return this.httpClient.get<Company>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/company`)
            .pipe(
                catchError(err => {
                    return of(null);
                })
            );
    }
}
