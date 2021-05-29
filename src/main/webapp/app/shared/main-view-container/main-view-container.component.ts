import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import * as AuthReducer from '../../core/auth/redux/auth.reducer';
import {Store} from '@ngrx/store';
import {AppConfigService} from '../../core/app-load/services/app-config.service';
import {filter, take} from 'rxjs/operators';

@Component({
    selector: 'otus-architect-main-view-container',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './main-view-container.component.html',
    styleUrls: ['./main-view-container.component.css']
})
export class MainViewContainerComponent implements OnInit, OnDestroy {

    constructor(
        private store: Store<AuthReducer.AuthState>,
        private configService: AppConfigService
    ) {
    }

    ngOnInit() {
        this.configService.config$.pipe(
            filter(config => !!config),
            take(1)
        ).subscribe(config => {

        });
    }

    ngOnDestroy(): void {

    }
}
