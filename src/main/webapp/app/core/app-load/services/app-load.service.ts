import {Injectable} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import * as AuthReducer from '../../auth/redux/auth.reducer';
import * as CoreActions from '../../redux/core.actions';
import {Store} from '@ngrx/store';
import {AppConfigService} from './app-config.service';
import {filter, take} from 'rxjs/operators';
import {LoadCategories, LoadUserInfo, LoadWorkspace} from '../../../shared/redux/general.actions';

@Injectable({
    providedIn: 'root'
})
export class AppLoadService<Payload extends CoreActions.InitializationPayload> {

    constructor(
        private store: Store<AuthReducer.AuthState>,
        private authService: AuthService,
        private configService: AppConfigService) {
    }

    public initialize(): Promise<void> {
        console.log('Initialization...');
        return new Promise<void>((resolve) => {
            this.configService.config$.pipe(
                filter(conf => !!conf),
                take(1)).toPromise().then(() => {
                resolve();
                this.store.dispatch(new LoadUserInfo());
                this.store.dispatch(new LoadWorkspace());
                this.store.dispatch(new LoadCategories());
            });
        });
    }
}

