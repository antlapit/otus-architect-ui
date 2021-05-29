import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {UserIdentity} from '../domain/UserIdentity';
import {AppConfigService} from '../app-load/services/app-config.service';

@Injectable({ providedIn: 'root' })
export class UserService {
    protected config: any = null;

    constructor(private http: HttpClient,
                protected configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    get(): Observable<HttpResponse<UserIdentity>> {
        return this.http.get<UserIdentity>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/user`, { observe: 'response' });
    }

}
