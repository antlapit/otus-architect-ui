import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {Subscription} from 'rxjs';
import {FinApplication} from '../../models/fin-application.model';
import {AppConfigService} from '../../../core/app-load/services/app-config.service';
import {PlatformLocation} from '@angular/common';

@Component({
    selector: 'otus-architect-application-complete-view',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-complete-view.component.html',
    styleUrls: ['./application-complete-view.component.scss']
})
export class ApplicationCompleteViewComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private configService: AppConfigService,
                private platformLocation: PlatformLocation) {
    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
    }
}
