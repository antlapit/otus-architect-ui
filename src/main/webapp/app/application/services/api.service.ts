import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApplicationState} from '../redux/application-state';
import {Store} from '@ngrx/store';
import {AppConfigService} from '../../core/app-load/services/app-config.service';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    protected config: any = null;
    protected personApi: string;
    protected bgApi: string;
    protected signingApi: string;
    protected referencesApi: string;

    constructor(
        protected http: HttpClient,
        protected configService: AppConfigService,
        protected store: Store<ApplicationState>,
    ) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            this.personApi = `${((this.config || {}).backend || {}).host}/backend-bg/api/person`;
            this.bgApi = `${((this.config || {}).backend || {}).host}/backend-bg/api/bg`;
            this.signingApi = `${((this.config || {}).backend || {}).host}/backend-bg/api/sign`;
            this.referencesApi = `${((this.config || {}).backend || {}).host}/backend-bg/api/references`;
        });
    }
}
