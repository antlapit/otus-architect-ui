import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppConfigService} from '../app-load/services/app-config.service';
import {Company} from '../domain/Company';

@Injectable({ providedIn: 'root' })
export class CompanyService {
    protected config: any = null;

    constructor(private http: HttpClient,
                protected configService: AppConfigService) {
        this.configService.config$.subscribe(config => {
            this.config = config;
        });
    }

    get(): Observable<HttpResponse<Company>> {
        return this.http.get<Company>(`${((this.config || {}).backend || {}).host}/backend-bg/api/person/company`, { observe: 'response' });
    }

}
