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
    protected api: string;

    constructor(
        protected http: HttpClient,
        protected configService: AppConfigService,
        protected store: Store<ApplicationState>,
    ) {
        this.configService.config$.subscribe(config => {
            this.config = config;
            this.api = `${((this.config || {}).backend || {}).host}/api`;
        });
    }
}
