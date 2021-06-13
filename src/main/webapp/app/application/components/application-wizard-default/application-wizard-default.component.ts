import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../redux/application-state';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FinApplication} from '../../models/fin-application.model';

@Component({
    selector: 'otus-architect-application-wizard-default',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './application-wizard-default.component.html',
    styleUrls: ['./application-wizard-default.component.scss']
})
export class ApplicationWizardDefaultComponent implements OnInit, OnDestroy {

    private all$: Subscription = new Subscription();

    @Input('finApplication')
    selectedFinApplication: FinApplication;

    constructor(private cd: ChangeDetectorRef,
                private store: Store<ApplicationState>,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnDestroy(): void {
        this.all$.unsubscribe();
    }

    ngOnInit(): void {
    }
}
